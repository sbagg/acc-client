import { LitElement} from 'lit';
import {render} from "./acc-page-table.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccTable extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-table', AccTable);