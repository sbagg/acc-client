import { LitElement} from 'lit';
import {render} from "./acc-selector.tpl.js";


import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';

class AccSelector extends Mixin(LitElement)
    .with(MainDomElement) {

    

  static get properties() {
    return {
        dbName : {type: Array},
        dbData : {type: Object},
        dbResult : {type: Array}
    };
   }
  constructor() {
    super();
    
    this.render = render.bind(this);

    this.version = "alpha";
    this.dbName = ['keyA', 'keyB', 'keyC'];
    this.dbData = {'keyA': [{'1': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}],
                   'keyB': [{'2': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}],
                   'keyC': [{'3': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}, 
                            {'A': 'A Objects', 'B': 'B Objects', 'C': 'C Objects'}]
                  } 
    this.dbResult;
    
    
  }

  clickSelector(){
    this.selectpicker = this.renderRoot.querySelector("#selectpicker");
    let strUser = this.selectpicker.options[this.selectpicker.selectedIndex].text;
    let keys = Object.keys(this.dbData);

    keys.map(key => {
        if(key == strUser){
            this.dbResult = this.dbData[key];
        }
        
    });

    console.log(this.dbResult);
  }

}

customElements.define('acc-selector', AccSelector);