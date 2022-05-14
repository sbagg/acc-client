import { html } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
import layoutCss from "@ucd-lib/theme-sass/5_layout/_index.css.js";
import base from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import utility from "@ucd-lib/theme-sass/6_utility/_index.css.js";
export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${buttonStyles}
        ${layoutCss}
        ${base}
        ${utility}

      :host {
        display: block;
      }
      .content-box {
        margin: 0 35px;
      }
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">Acc Chart</h1>
    </div>
    <div class="content-box">
      <acc-chart object=${JSON.stringify(this.object)} kc_id=${JSON.stringify(this.kc_id)}></acc-chart>
    </div>
    
`;
}