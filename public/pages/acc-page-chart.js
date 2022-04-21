import { LitElement} from 'lit';
import {render} from "./acc-page-chart.tpl.js";
// import 'chartjs-web-components';
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccChart extends AccUtilsDataCollection  {
  constructor() {
    super();

    this.render = render.bind(this);
    this.version = "alpha";
    

  }


}

customElements.define('acc-page-chart', AccChart);