import { LitElement} from 'lit';
import {render} from "./acc-page-error.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccError extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-error', AccError);