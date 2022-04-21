import { LitElement} from 'lit';
import {render} from "./acc-page-loading.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

class AccLoading extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-loading', AccLoading);