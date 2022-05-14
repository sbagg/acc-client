import { LitElement} from 'lit';
import {render} from "./acc-page-about.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

class AccAbout extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-about', AccAbout);