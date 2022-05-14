import { LitElement} from 'lit';
import {render} from "./acc-page-component.tpl.js";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";

import "./components/acc-factoid";
import "./components/chart";
import "./components/pdf";
import "./components/table";
import "./components/acc-selector";
import "./components/calculation";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon'
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons'
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/academic'

class AccComponent extends AccUtilsDataCollection {
  constructor() {
    super();
    this.render = render.bind(this);

    this.version = "alpha";
    
    this.sampleParamter = [
      {'name': 'A', 'info': 'This is the A parameter'},
      {'name': 'B', 'info': 'This is the B parameter'},
      {'name': 'V', 'info': 'This is the C parameter'},
    ];

    this.object = [{'id': 'First Dataset', 'kc0': 1, 'kc1': 2, 'kcMid': 4, 'earlyT': 2, 'lateT': 1, 'midT': .5}, 
                   {'id': 'Second Dataset', 'kc0': .25, 'kc1': 4, 'kcMid': 3, 'earlyT': 2, 'lateT': 1.3, 'midT': .65}, 
                   {'id': 'Third Dataset', 'kc0': .7, 'kc1': 2, 'kcMid': .75,'earlyT': 1, 'lateT': 1.4, 'midT': .5}
                  ];
    this.kc_id = ["First Dataset", "Second Dataset", "Third Dataset"]
  
    
  }


  
  updated(){

    //Take this couple of lines if you want to get dbResult;
    this.button = this.renderRoot.querySelector("#selectButton");
    this.button.addEventListener('click', function(){
    });
    // Finish section
    
  }

    


}

customElements.define('acc-page-component', AccComponent);