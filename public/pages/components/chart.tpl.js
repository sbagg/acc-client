import { html } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import layoutCss from "@ucd-lib/theme-sass/5_layout/_index.css.js";
import base from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import baseCss from "@ucd-lib/theme-sass/2_base_class/_index.css.js";
import utility from "@ucd-lib/theme-sass/6_utility/_index.css.js";

export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${layoutCss}
        ${base}
        ${utility}
        ${baseCss}

      :host {
        display: block;
      }
      #question-box {
        display: table-cell; 
        height: inherit;
        width:50%;
      }
      #solution-box {
          display: table-cell;
          text-align: center;
          height: inherit;
      }
      #table {
        display: table-row; 
        vertical-align: middle;
      }
      .scroll-box{
        overflow: scroll;
        height:200px;
      }
      @media only screen and (max-width: 900px) {
        /* For mobile phones: */
        #question-box, #solution-box, #table{
            display: block; 
        }
      }
    
    </style>
  <div style="width: 100%; display: table;">
    <div id="table">
      <div id="question-box">
          <fieldset id="itemCheck">
            <legend>Kc Ids</legend>
            <div class="scroll-box">
              <ul class="list--reset">
                ${this.kc_id.map((id, cnt) => html`
                  <li><input id="${id}" name="checkbox" type="checkbox" value="${id}"><label for="${id}">${this.object[cnt].label}</label></li>
                `)} 
              </ul>
            </div>
          </fieldset>
      </div>

      <div id="solution-box">
        <canvas id="myChart" width=${this.width} height=${this.height}></canvas>
      </div>  
    </div>
  </div>
`;
}