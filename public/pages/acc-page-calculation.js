import { LitElement} from 'lit';
import {render} from "./acc-page-calculation.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";


class AccCalculation extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";

    this.sampleParamter = [
      {'name': 'A', 'info': 'Format: Number ie 5'},
      {'name': 'B', 'info': 'Format: Number ie 5'},
      {'name': 'V', 'info': 'Format: Number ie 5'},
    ];
    this.kc_dateParamter = [];
    this.kc_growthParameter= [];
    this.etawParameter= [];

    this.cum_etParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'd', 'info': 'Format: Number ie 32'},
    ];

    this.etParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'd', 'info': 'Format: Number ie 32'},
    ];

    this.ifftParamter = [
      {'name': 'E', 'info': 'Format: Array ie [2.32, 3.34, 32]'},
      {'name': 'D', 'info': 'Format: Array ie [2.32, 3.34, 23]'},
      {'name': 'N', 'info': 'Format: Number ie 32'},
    ];
    
  }


}

customElements.define('acc-page-calculation', AccCalculation);