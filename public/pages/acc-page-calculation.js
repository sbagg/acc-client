import { LitElement} from 'lit';
import {render} from "./acc-page-calculation.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

class AccCalculation extends LitElement {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-calculation', AccCalculation);