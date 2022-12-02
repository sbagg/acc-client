import { LitElement} from 'lit';
import {render} from "./databaseCalc.tpl.js";


import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import AccUtilsDataCollection from '../utils/acc-utils-data-collection'

class AccDatabaseCalculation extends Mixin(LitElement)
    .with(MainDomElement) {

    

  static get properties() {
    return {
        kcData : {type: Object},
    };
   }
  constructor() {
    super();
    
    this.render = render.bind(this);
    this.kcData;

    this.version = "alpha";

    
    
  }


}

customElements.define('acc-database-calculation', AccDatabaseCalculation);