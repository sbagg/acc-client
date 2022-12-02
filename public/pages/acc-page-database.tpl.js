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
      .content-box {
        margin: 0 35px;
      }
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">Acc Database</h1>
    </div>

    <div class="content-box">

      <h2>How It Works</h2>
      <p> This calculates the given data in the postgres database that is available. </p>
      <p> It returns a table of calculated data that is is both exportable and downloadable. </p>
      <p> Some features include:</p>
      <ul class="list--arrow">
        <li>KC Factors calculation</li>
        <li>Database calculation</li>
        <li>Credential storage</li>
        <li>Redis storage</li>
        <li>Export Calculation Data</li>
      </ul>
      <br />
      <div class="databaseOutput">

      </div>
      


    </div>
    
`;
}