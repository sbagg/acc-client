import { LitElement} from 'lit';
import {render} from "./acc-page-home.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

import "./components/acc-factoid";
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";

class AccHome extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";


  }


  


}

customElements.define('acc-page-home', AccHome);