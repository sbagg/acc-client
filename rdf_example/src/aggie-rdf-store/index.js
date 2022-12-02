//const storeStream = require("rdf-store-stream").storeStream;
import {storeStream} from "rdf-store-stream";
// var fs = require('fs');
import fs from 'fs';
import process from "process";
// import fs from 'fs-js'
// const { exec } = require("child_process");
import {exec} from 'child_process';

// const jsonld = require('jsonld');
import jsonld from 'jsonld';

// const rdfParser = require("rdf-parse").default;
import rdfParser from "rdf-parse";

// const validUrl = require('valid-url');
import validUrl from "valid-url";


// const SparqlClient = require('sparql-http-client')
import {SparqlEndpointFetcher} from "fetch-sparql-endpoint";
import stringToStream from "string-to-stream"


/**
  * @method ldFraming
  * @description Changes the framing of the Linked Data in the store
  * @param {Object} items
*/
async function ldFraming(items) {
    console.log('Linked Data Framing');
    let qd = "";
    let keys = [];
    let cArray = [];
    let context = {};
    let expanded; 
    let flattened; 
    let compacted; 
    let nquads;
    let line;

    const regex = /(\s|\^\^)((\bhttps?:\/\/|urn?:|ftp?:|file?:|mailto?:|tel?:|blob?:chrome?:|resource?:|sftp?:)\S+)/g;

    for (const quads of items){
        let subject, predicate, object, graph;
        subject = quads.subject.id;
        predicate = quads.predicate.id;
        object = quads.object.id;
        graph = quads.graph.id;
        line = ' ' + subject + ' ' + predicate + ' ' + object + ' ' + graph + ' .\n';
        line = line.replaceAll(regex, '$1<$2>');

        qd += line
    }

    nquads = qd;
    localJsonFile(nquads, "nquads.txt")
    
    //standard
    let originialDoc = await jsonld.fromRDF(qd, {format: 'application/n-quads'});
    let doc;

    try{
        //Create Context File
        for(let obj of originialDoc){
            let ob = Object.keys(obj);
            cArray = cArray.concat(ob);
        }

        let cArrayUnique = cArray.filter((c, index) => {
            return cArray.indexOf(c) === index;
        });

        let cArrayUniqueUrl = cArrayUnique.filter(element => {
            return element.includes('http')
        });

        const titleregex = /.+(\#|\/)(.+)$/g;

        for (let element of cArrayUniqueUrl) {
            element = element.replace(titleregex, '$2')
            keys.push(element)
        } 

        if (keys.length == cArrayUniqueUrl.length){
            keys.forEach(function (value, i) {
                context[value] = cArrayUniqueUrl[i];
            });
            compacted = await jsonld.compact(originialDoc, context);
            localJsonFile(compacted, "compacted.json")

            doc = compacted;

        }
        else{
            throw new Exception ("Does not match....skipping Compacted file");
        }
    }
    catch(error){
        console.log("Could not create context file....skipping Compacted file....")
        doc = originialDoc;
    }


    //Flattened
    try{
        flattened = await jsonld.flatten(doc);
        localJsonFile(flattened, "flattened.json")
    }catch(error){
        console.log("Something went wrong...skipping Flattened file....")
    }

    //Expanded
    try{
        expanded = await jsonld.expand(doc);
        localJsonFile(expanded, "expanded.json")
    }catch(error){
        console.log("Something went wrong...skipping Expanded file....")
    }

}

/**
  * @method printStore
  * @description Prints the Store values prettily after entering in the JSON-LD entry
  * @param {Object} items
*/
function printStore(items) {
    console.log("Print formatted store to command line and to file prettily...");

    let arrTitle = ["Subject", "Predicate", "Object", "Graph"];
    let titleString = arrTitle.join(' | ');
    let file = "";
    console.log(titleString);    
    for (const quads of items){
        let arr = [quads.subject.id, quads.predicate.id, quads.object.id, quads.graph.id];
        let str = arr.join(' | ');
        file = file + str + "\n"
        console.log(str);    
    }
    localJsonFile(file, "pretty_print_store.json")
}

/**
  * @method storeInSPARQL
  * @description Send the Linked Data to the SPARQL database and put in endpoint
  * @param {Object} items
  * @param {String} endpoint
*/
async function storeInSPARQL(items, endpoint) {
    console.log('Storing in Sparql endpoint...');

    ldFraming(items);
    let text = fs.readFileSync("files/nquads.txt", 'utf-8');
    const fetcher = new SparqlEndpointFetcher();

    // const client = new SparqlClient({ updateUrl: endpoint })    
    const query = `INSERT DATA{ `+ text + `}`;

    await fetcher.fetchUpdate(endpoint, query);


    // client.query.update(query, {
    //     headers: {
    //       Authorization: 'Bearer token' //Fix this
    //     }
    // })

}

/**
  * @method option
  * @description If options are given sends them to their designated function
  * @param {Object} storageItems
  * @param {Object} print
  * @param {Object} frame
  * @param {Object} database
  * @param {Object} file
  * @param {Object} serve
  * @param {Object} port 
  * @param {Object} endpoint
*/
function option(storageItems, print, frame,  database,  file,  serve, port, endpoint) {
    if(process.argv[3].includes('p') || print) printStore(storageItems);
    if(process.argv[3].includes('f') || frame) ldFraming(storageItems);
    if((process.argv[3].includes('d') && endpoint != "none") || (database  && endpoint != "none")) storeInSPARQL(storageItems, endpoint);
    if(process.argv[3].includes('t') || file) localJsonFile(storageItems);
    if(process.argv[3].includes('i') || serve) localJsonServe(storageItems,port);

}

/**
  * @method localJsonServe
  * @description Runs json file function and servers current store to a json server
  * @param {Object} storageItems
  * @param {String} port optional change
*/
function localJsonServe(storageItems, port) {
    console.log("Serving JSON file to localhost...");
    localJsonFile(storageItems)
    let cmd = 'json-server --watch files/current_store.json --port ' + port
   
    exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
}

/**
  * @method localJsonFile
  * @description Makes item given into a file, complete with file name
  * @param {Object} storageItems
  * @param {String} file_name
*/
function localJsonFile(storageItems, file_name="none") {
    file_name == "none" ? console.log("Storing the current_store with json format into in a file...") : console.log("Storing the " + file_name + " in a file..."); 

    let newJson = {};
    let tmp_file = ""
    let count = 0;
    if(file_name == "none"){
        tmp_file = 'current_store.json';
        for (const quads of storageItems){
            let quad = quads;
            newJson[String(count)] = [quad];
    
            count = count + 1;
        }
        newJson = JSON.stringify(newJson)
    }
    else if(file_name == "nquads.txt"){
        newJson = storageItems;
        tmp_file = file_name;

    }
    else {
        newJson = JSON.stringify(storageItems);
        tmp_file = file_name;
    }
    let folder_name = "files/" + tmp_file;
    fs.writeFileSync(folder_name, newJson,"utf-8");
    console.log("File Created: ", tmp_file);
}

/**
  * @method storeLocal
  * @description Checks if the url or an array of urls are valid 
  * @param {Array} url
*/
function storeLocal(url){
    console.log("URL check...\n"); 
    for(let i of url){
        if (!validUrl.isWebUri(i)){
            throw new Error("One of these urls are not a valid one");
        }
    }
    httpfetchJSON(url);

}

/**
  * @method httpfetchJSON
  * @description Checks if the url or an array of urls are valid 
  * @param {Array} url array of urls with json-ld
  * @param {boolean} print optional prints out the current store
  * @param {boolean} frame optional reframes store into different options prints to file
  * @param {boolean} database prints the stores to the endpoint sparql given
  * @param {boolean} file optional prints current store to file
  * @param {boolean} serve optional serve to a localhost jsonserver
  * @param {boolean} port optional redefines port for the json server 
  * @param {boolean} endpoint optional sparql endpoint for database

  * httpfetchJSON(urlArray, {print=true, file=true, serve=true, port=4005})
*/
export default async function httpfetchJSON(urls, {print=false, frame=false, database=false, file=false, serve=false, port=4005, endpoint="none"} = {}) {
    let store;
    let jld = '';
    for (let url of urls) {
        let json, jsonld;
        const res = await fetch(url);

        json = await res.json();
        console.log("JSON recieved: ", json);
        jsonld =  JSON.stringify(json);
        jld += jsonld
    }

    let textStream = stringToStream(jld);

    const quadStream = rdfParser.default.parse(textStream, { contentType: 'application/ld+json'});

    // const parserJsonld = new ParserJsonld()

    // const input = new Readable({
    //   read: () => {
    //     input.push(jld)
    //     input.push(null)
    //   }
    // })
    
    // const quadStream = parserJsonld.import(textStream)
    // console.log(quadStream);

    // let getContext;
    // const someObject = {context: []};

    // getContext = await someObject.context;

    // console.log(getContext);
    store = await storeStream(quadStream);
    console.log(store);

    if(process.argv[4]){
        if (!validUrl.isWebUri(endpoint))
            throw new Error("This sparql endpoint is not a valid url. Please inspect. ");   
        endpoint = process.argv[4];   
    }
    
    if(process.argv[3] || print || frame || (database && endpoint != "none") || file || serve)
       option(store, print, frame,  database,  file,  serve, port, endpoint);
}

let helpLog = `Welcome to Aggie Local Store! This works with the json-ld url that you want to store. 
               This also comes with the optional flags for what to do with the store after.

               node ld-local-store.js [url|array of urls] [-flags (-pfd)] [sparql endpoint url (required for storing in endpoint)]

               Example: node index.js https://raw.githubusercontent.com/UCDavisLibrary/fin-example-repository/ext-obj/test/transaction/faq/external_resources_ldp.json,https://raw.githubusercontent.com/UCDavisLibrary/fin-example-repository/ext-obj/test/transaction/faq/external_resources/internal.jpg_ldp.json,https://raw.githubusercontent.com/UCDavisLibrary/fin-example-repository/ext-obj/test/transaction/faq/external_resources/external.jpg_ldp.json -pft
               This program can take more than one url, which must be formatted as:
               http://example1.com,http://example1.com,http://example1.com


               p :: Prints whatever is in the store currently in ptetty format and for html
               f :: Allows changing the linked data to a particular framing
               d :: Stores the working store into given SPARQL database
               t :: Creates a Json file of the data in the store
               i :: Serves the Json file to a localhost json server (must be used with t)
              `;


/**
  * Start of function
  * If command line looks for arguments between 2 or 4 arguments
  * It tells if command lines are accurate
*/

if(process) {
    if(process.argv[2] == "--help" || process.argv[2] == "-h"){
        console.log(helpLog);
    } else {
        if(process.argv.length <= 5 && process.argv.length > 2){
            let urlArray = process.argv[2].split(",");
            storeLocal(urlArray);
        }
        else if (process.argv.length <= 2) console.warn("Too few commands.  This should consist of one url and an optional one section of flags.  If on browser ignore this warning.");
        else{
            console.error("No more than two commands in command line.  There are 4 or more commands.")
        }
    }
}

  




