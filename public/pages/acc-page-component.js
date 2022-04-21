import { LitElement} from 'lit';
import {render} from "./acc-page-component.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

import "./components/acc-factoid";
import "./components/chart";
import "./components/pdf";
import "./components/acc-selector";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/academic'

class AccComponent extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('acc-page-component', AccComponent);