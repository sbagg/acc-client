import { LitElement} from 'lit';
import {render} from "./acc-page-database.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";
import "./components/databaseCalc";


import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";


class AccDatabase extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
  }

  updated(){
    let uploadOutput = this.shadowRoot.querySelector('.databaseOutput');
    uploadOutput.innerHTML = `<acc-database-calculation kcData='` + JSON.stringify(this.kcCombination) + `'></acc-database-calculation>`;
  }

}

customElements.define('acc-page-database', AccDatabase);