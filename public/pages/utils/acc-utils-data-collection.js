import { LitElement, html } from 'lit';
import API from "../../../models/APIModel";



export default class AccUtilsDataCollection extends LitElement {
  static get properties() {
    return {
      kcTotal: {type: Number},
      kcDateTotal: {type: Number},
      etoTotal: {type: Number},
      gridTotal: {type: Number},
      kcRows: {type: Array},
      kcDateRows: {type: Array},
      etoRows: {type: Array},
      gridRows: {type: Array},
      kcFields: {type: Array},
      kcDateFields: {type: Array},
      etoFields: {type: Array},
      gridFields: {type: Array},
      dbResult : {type: Array}

    };
  }
  constructor() {
    super();

    this.version = "alpha";
    this.loading = false;
    this.dbResult;
    this.getAPI();
    
  }

  async getAPI() {
    this.loading = false;
    let kc = await API.kc();
    let kcDate = await API.kcDate();
    let eto = await API.eto();
    let grid = await API.grid();

    // this.kcTotal = 5; //DELETE
    // this.kcDateTotal = 5; //DELETE
    // this.etoTotal = 10; //DELETE
    // this.gridTotal = 10; //DELETE

    this.kcTotal = kc.entriesNo;
    this.kcDateTotal = kcDate.entriesNo;
    this.etoTotal = eto.entriesNo;
    this.gridTotal = grid.entriesNo;

    this.kcRows = kc.rows;
    this.kcDateRows = kcDate.rows;
    this.etoRows = eto.rows;
    this.gridRows = grid.rows;

    this.kcFields = kc.fields;
    this.kcDateFields = kcDate.fields;
    this.etoFields = eto.fields;
    this.gridFields = grid.fields;

    this.kcSelectorLabels = this.getSelectorLabels(this.kcRows);
    this.kcDatesSelectorLabels = this.getSelectorLabels(this.kcDateRows);
    this.etoSelectorLabels = this.getSelectorLabels(this.etoRows);
    this.gridSelectorLabels = this.getSelectorLabels(this.gridRows);

    this.dbSelect = {
      "kc": this.kcRows, 
      "kcDate":  this.kcDateRows,
    }; 
    
    this.database ={
      "kc": 
      {"total" : this.kcTotal,
       "rows" : this.kcRows,
       "fields" : this.kcFields,
       "sLables" : this.kcSelectorLabels
      },
      "kcDate": 
      {"total" : this.kcDateTotal,
       "rows" : this.kcDateRows,
       "fields" : this.kcDateFields,
       "sLables" : this.kcDateSelectorLabels
      },
      "eto": 
      {"total" : this.etoTotal,
       "rows" : this.etoRows,
       "fields" : this.etoFields,
       "sLables" : this.etoSelectorLabels
      },
      "grid": 
      {"total" : this.gridTotal,
       "rows" : this.gridRows,
       "fields" : this.gridFields,
       "sLables" : this.gridSelectorLabels
      }
    }

    this.loading = true;
    this.requestUpdate();

  }


  getSelectorLabels(db){
    /*
      get Array of objects rows
      get the pid or id of db
      create labels from that list
      get values of object values
      got with selector format as usual with both in array format
    */
    
    let selectorList = [];
    db.map(row => {
      if("pid" in row || "id" in row ){
        selectorList.push(row["pid"] || row["id"] );
      }
      else{
        return null;
      }
    })
    return selectorList;
  }
}

customElements.define('acc-utils-data-collection', AccUtilsDataCollection);