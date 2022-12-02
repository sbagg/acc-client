import httpfetchJSON from "./aggie-rdf-store/index.js";
import {execSync} from 'child_process';

// // const httpfetchJSON = require("./rdf-store-project/ld-local-store").httpfetchJSON;
let urlList = [];
const url = document.querySelector('#url');
const button = document.querySelector('#insertURL');
const paragraph = document.querySelector('#textbox');
const storeUrl = document.querySelector('#storeUrl');


button.addEventListener("click", updateButton, false);
storeUrl.addEventListener("click", collectJson, false);


function updateButton() {
    urlList.push(url.value);
    paragraph.textContent = urlList.join('\n');
}

async function collectJson(type) {
    if(typeof(type) === 'object') type = "print_store";
    let file = "rdf-store-project/files/" + type + ".json"; 

    let text;
    let urlString = urlList.toString();
    // exec('ls -l', (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // });
    // console.log(httpfetchJSON(urlList));
    await httpfetchJSON(urlList); 
    fetch(file)
        .then(response => type == "print_store" ? response.text(): response.json())
        .then(textResp => {
            if(type == "print_store"){
                textLine = textResp.split("\\n");
                text = "<table border='1'>"
                text += "<tr><th>Subject</th><th>Predicate</th><th>Object</th><th>Graph</th></tr>"
                for (x of textLine) {
                    triples = x.split("|");
                    let subject = triples[0];
                    let predicate = triples[1];
                    let object = triples[2];
                    let graph = triples[3];
                    text += "<tr><td>" + subject + "</td><td>" + predicate + "</td><td>" + object + "</td><td>" + graph + "</td></tr>";
                }
                text += "</table>";  
                document.getElementById("demo").innerHTML = text;

                } else {
                    myObj = JSON.parse(textResp);
                }
        })
}

export default updateButton; collectJson;

// module.exports = {updateButton, collectJson}