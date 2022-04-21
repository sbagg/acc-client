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
      .import-icon{
        margin:auto;
        width:135px;
        height:135px;
        fill: var(--acc-color-farmers-market);
      }
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">Welcome to<span style="color:var(--acc-color-farmers-market)"> &nbsp;Aggie Crop Calculator</span>!</h1>
    </div>

    <div class="content-box">
      <div>
        <p>Crop management is a robust area for research, especially 
          in the University of California Davis where agricultural studies excel.</p>
        <p>Aggie Crop is a common standard web accessible interface can 
          improve data availability.</p>
        <br>

        <p>This site can be used in different purposes:</p>

        <ul class="list--arrow">
          <li>
            <strong>Chart View</strong>
            <br>Including Pie charts, bar graphs, and more!
          </li>
          <li>
            <strong>PDF View</strong>
            <br>Creates an exportable pdf summary of data available in open postgres database
          </li>
          <li>
            <strong>Table View</strong>
            <br>Initial table view reading based on open postgres database that is customizable
          </li>
          <li>
            <strong>Calculation</strong>
            <br>A section build for running small calculation and exporting such files 
            <br><strong>Coming Soon!</strong> Includes the ability to store calculations in local redis database for member use. 
          </li>
        </ul>   
      </div>
      <br>
      <h2 style="text-align:center;">Currently In Our <span style="color:var(--acc-color-farmers-market);">Plant Database</span></h2>
      <div class="l-4col">
            <acc-factoid class="l-first panel o-box" statistic="${this.kcTotal}" title="KC Factors">
              <span><ucdlib-icon class="import-icon" icon="autorenew"></ucdlib-icon></span>
            </acc-factoid>

            <acc-factoid class="l-second panel o-box" statistic="${this.kcDateTotal}" title="KC Dates">
              <span><ucdlib-icon class="import-icon" icon="book"></ucdlib-icon></span>
            </acc-factoid>

            <acc-factoid class="l-third panel o-box" statistic="${this.etoTotal}" title="ETO Entries">
              <span><ucdlib-icon class="import-icon" icon="lightbulb"></ucdlib-icon></span>
            </acc-factoid>
          
            <acc-factoid class="l-fourth panel o-box" statistic="${this.gridTotal}" title="Grid Entries">
              <span><ucdlib-icon class="import-icon" icon="apps"></ucdlib-icon></span>
            </acc-factoid>
      </div>
    </div>
`;
}