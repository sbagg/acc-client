import { LitElement} from 'lit';
import {render} from "./calculation.tpl.js";
import {sample, fft, ifft, et, cum_et, kc_growth, kc_date, etaw} from "../utils/functions.js";

import "@ucd-lib/theme-elements/brand/ucd-theme-collapse/ucd-theme-collapse.js";

class AccCalculation extends LitElement {

  static get properties() {
        return {
          param : {type: Array},
          function: {type: String}
        };
  }

  constructor() {
    super();


    this.render = render.bind(this);

    
  }
  
  clickSelector(){
    let matches = this.renderRoot.querySelectorAll("input[name="+ this.function +"]");
    matches.forEach(match =>{
      let value = match.value;
      let arg = match.id;
      let foundParam = this.param.find(par => par.name === arg);
      if(Array.isArray(value)){
        for(v in value) parseInt(v);
        foundParam["value"] = value;
      }else{
        foundParam["value"] = parseInt(value);
      }
    });


    let params = this.param.map((obj) => obj.value);

    switch (this.function) {
        case 'et':
          this.result = et.apply(params);
          break;
        case 'kc_growth':
          this.result = kc_growth.apply(params);
          break;
        case 'kc_date':
          this.result = kc_date.apply(params);
          break;
        case 'cum_et':
          this.result = cum_et.apply(params);
          //this.result = fft.apply(et);
          break;
        case 'etaw':
          this.result = etaw.apply(params);
          break;
        case 'ifft':
          this.result = ifft.apply(params);
          break;
        case 'sample':
          this.result = sample.apply(this, params);
          break;
        default:
          console.log(`Sorry, we are out of functions at the moment....`);
    }
    this.requestUpdate();
      
  }

  


}

customElements.define('acc-calculation', AccCalculation);