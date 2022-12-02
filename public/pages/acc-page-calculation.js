import { LitElement} from 'lit';
import {render} from "./acc-page-calculation.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";
import "./components/databaseCalc";


import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";
import "@ucd-lib/theme-elements/brand/ucd-theme-collapse/ucd-theme-collapse.js";



class AccCalculation extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    this.uploadFile;
    this.jsonUpload;

    this.sampleParamter = [
      {'name': 'A', 'info': 'Format: Number ie 5'},
      {'name': 'B', 'info': 'Format: Number ie 5'},
      {'name': 'V', 'info': 'Format: Number ie 5'},
    ];
    this.kc_dateParamter = [];
    this.kc_growthParameter= [];
    this.etawParameter= [];

    this.cum_etParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'd', 'info': 'Format: Number ie 32'},
    ];

    this.etParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'd', 'info': 'Format: Number ie 32'},
    ];

    this.ifftParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'N', 'info': 'Format: Number ie 32'},
    ];
    
  }

  
  updated(){
    console.log(this.jsonUpload);
  }

  getUpload(input){
    this.jsonUpload = input; 
  }
  _uploadConversion(){
    let fileElement = this.shadowRoot.querySelector('#fileInput');
    // let uploadOutput = this.shadowRoot.querySelector('.databaseOutput');

      // check if user had selected a file
      if (fileElement.files.length === 0) {
        alert('please choose a file')
        return
      }

      this.uploadFile = fileElement.files[0];
      
      let reader = new FileReader();
      reader.onload = function () {
          let arr = reader.result.split('\n');     

          let jsonObj = [];
          let headers = arr[0].split(',');
          for(let i = 1; i < arr.length; i++) {
            let data = arr[i].split(',');
            let obj = {};
            for(let j = 0; j < data.length; j++) {
               obj[headers[j].trim()] = data[j].trim();
            }
            jsonObj.push(obj);
          }
          let obj = JSON.parse(JSON.stringify(jsonObj));
          this.updateComplete.then(() => { 
            console.log("This updated:", obj)
          });

          // uploadOutput.innerHTML = `<acc-database-calculation kcData='` + JSON.stringify(this.jsonUpload) + `'></acc-database-calculation>`;
      };
        // start reading the file. When it is done, calls the onload event defined above.
      reader.readAsBinaryString(this.uploadFile);


    }


}

customElements.define('acc-page-calculation', AccCalculation);