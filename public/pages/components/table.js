import { LitElement} from 'lit';
import {render} from "./table.tpl.js";
import 'file-saver';

class AccTable extends LitElement {

  static get properties() {
        return {
          label : {type: Object},
          data : {type: Object},
          title : {type: String},
        };
  }

  constructor() {
    super();
   
    this.data = [["Hello",  "World",  "World"], ["There",  "Universe",  "World"], ["New", "Galaxy",  "World"]];
    this.label = [["Header 1", "Header 2", "Header 3"]];
    this.title = 'Custom Table Title'


    this.render = render.bind(this);

    
  } 


  exportCSV() {
    let csv = [];
    const rows = this.renderRoot.querySelectorAll("table tr");
  
    for (const row of rows.values()) {
      const cells = row.querySelectorAll("td, th");
      const rowText = Array.from(cells).map((cell) => cell.innerText);
      csv.push(rowText.join(","));
    }
    const csvFile = new Blob([csv.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    saveAs(csvFile, "DataCSV.csv");
  }

  exportExcel() {
    let excel = [];
    const rows = this.renderRoot.querySelectorAll("table tr");
  
    for (const row of rows.values()) {
      const cells = row.querySelectorAll("td, th");
      const rowText = Array.from(cells).map((cell) => cell.innerText);
      excel.push(rowText.join(","));
    }
    const excelFile = new Blob([excel.join("\n")], {
      type: "text/xlsx;charset=utf-8;"
    });
    saveAs(excelFile, "DataExcel.xlsx");
  }
  


}

customElements.define('acc-table', AccTable);