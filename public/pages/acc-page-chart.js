import { LitElement} from 'lit';
import {render} from "./acc-page-chart.tpl.js";
import "./components/acc-selector";
import "./components/chart";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

class AccChart extends AccUtilsDataCollection  {
  constructor() {
    super();

    this.render = render.bind(this);
    this.version = "alpha";
    this.result;
    

  }


  updated(){
    let db = this.database;  
    this.object = db['kc'].rows;
    this.kc_id = db['kc'].sLables;
    let content = this.renderRoot.querySelector('.content-box');
    let chart = `<acc-chart object='` + JSON.stringify(this.object) + `' kc_id='` + JSON.stringify(this.kc_id) + `'></acc-chart>`;
    content.innerHTML = chart;

  }


}

customElements.define('acc-page-chart', AccChart);