import { LitElement} from 'lit';
import {render} from "./acc-page-pdf.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccPDF extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-pdf', AccPDF);