import { LitElement} from 'lit';
import {render} from "./acc-page-help.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

class AccHelp extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-help', AccHelp);