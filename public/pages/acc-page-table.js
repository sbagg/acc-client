import { LitElement} from 'lit';
import {render} from "./acc-page-table.tpl.js";
import "./components/acc-selector";
import "./components/table";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccTable extends AccUtilsDataCollection {
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
    let table = `<acc-selector id="select" dbName='` + JSON.stringify(this.labels) + `' dbData='` + JSON.stringify(this.data) + `'></acc-selector>`;
    con.innerHTML = table;

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
        content.innerHTML = `<acc-table data='` + JSON.stringify(this.resultArray) + `' label='` + JSON.stringify(this.labelArray) + `'></acc-table>`;
      this.requestUpdate();
  }


  // updated(changedProps) {

  //   this.button = this.renderRoot.querySelector("#selectButton");  
    
  //   this.content = this.renderRoot.querySelector("#content");
  //   this.button.addEventListener('click', this.change(this.content));
  // }

  // change = (content) => {
  // 	return () => {
  //     this.result = AccUtilsDataCollection.dbResult;
  //     this.label = Object.keys(this.result[0]);
  //     this.labelArray = [this.label];
      
  //     this.resultArray = [];
  //     for(let obj of this.result){        
  //       this.resultArray.push(Object.values(obj));
  //     }
      
  //     this.requestUpdate();
  //   }
  // }

}

customElements.define('acc-page-table', AccTable);