import { AcroFormCheckBox } from 'jspdf';
import { LitElement} from 'lit';
import {render} from "./acc-page-pdf.tpl.js";
import "./components/acc-selector";
import "./components/pdf";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccPDF extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);
    this.result = undefined;

    this.version = "alpha";

    
    
  }

  check(){
    if(this.result !== AccUtilsDataCollection.dbResult){
      console.log("it makes it here");
      this.change();
    }
  }

  updated(changedProps) {
    this.labels = Object.keys(this.dbSelect);
    this.data = this.dbSelect;
    let con = this.renderRoot.querySelector('.content-select');
    let pdf = `<acc-selector id="select" dbName='` + JSON.stringify(this.labels) + `' dbData='` + JSON.stringify(this.data) + `'></acc-selector>`;
    con.innerHTML = pdf;

    setInterval(() => this.check(), 100);
  }

  change(){

      
      this.result = AccUtilsDataCollection.dbResult;
      this.label = Object.keys(this.result[0]);
      this.labelArray = [this.label];
      
      this.resultArray = [];
      for(let obj of this.result){        
        this.resultArray.push(Object.values(obj));
      }
      let content = this.renderRoot.querySelector('#content');
      if(content != null)
        content.innerHTML = `<acc-pdf data='` + JSON.stringify(this.resultArray) + `' label='` + JSON.stringify(this.labelArray) + `'></acc-pdf>`;
      this.requestUpdate();
  }


}

customElements.define('acc-page-pdf', AccPDF);