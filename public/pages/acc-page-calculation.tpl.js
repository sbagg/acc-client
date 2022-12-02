import { html } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import layoutCss from "@ucd-lib/theme-sass/5_layout/_index.css.js";
import base from "@ucd-lib/theme-sass/1_base_html/_index.css.js";
import baseCss from "@ucd-lib/theme-sass/2_base_class/_index.css.js";
import utility from "@ucd-lib/theme-sass/6_utility/_index.css.js";
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";


export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${layoutCss}
        ${base}
        ${utility}
        ${baseCss}
        ${buttonStyles}


      :host {
        display: block;
      }
      .content-box {
        margin: 0 35px;
      }
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">Acc Calulation</h1>
    </div>

    <div class="content-box">

      <h2>How It Works</h2>
      <p>Expand the one the formula you want to use and give the correct parameters. </p>
      <p>You will be returned with the correct result in the right-hand box after.</p>
      <p>Import all data for calculation and extraction.</p>
      <p>Some features include:</p>
      <ul class="list--arrow">
        <li>ETO calculation</li>
        <li>ETC calculation</li>
        <li>KC Factors calculation</li>
        <li>Import Calculation Data</li>
        <li>Export Calculation Data</li>
        <li>Redis storage</li>
      </ul>
      <br />
      <p>An example of running this is this sample summation function.</p>
      <acc-calculation function="sample" param="${JSON.stringify(this.sampleParamter)}"></acc-calculation>
      <br />

      <ucd-theme-collapse title="Imported Calculation">
        <input id="fileInput" type="file"/>
        <button id="uploadButton" class="btn btn--primary" @click=${this._uploadConversion}>Upload</button>

        <div class="databaseOutput">

        </div>

      </ucd-theme-collapse>

      <ucd-theme-collapse title="Individual Calculation">

        <p>The available functions are as follows:</p>
        <ul class="list--arrow">
          <li>Cummulative Et</li>
          <li>Et</li>
          <li>Ifft</li>
        </ul>
        <br />
        <acc-calculation function="cum_et" param="${JSON.stringify(this.cum_etParamter)}"></acc-calculation>
        <acc-calculation function="et" param="${JSON.stringify(this.etParamter)}"></acc-calculation>
        <acc-calculation function="ifft" param="${JSON.stringify(this.ifftParamter)}"></acc-calculation>
        <br />
        <p>In development:</p>
        <ul class="list--arrow">
          <li>KC_Growth</li>
          <li>KC_Date</li>
          <li>ETaw</li>
        </ul>
        <acc-calculation function="kc_growth" param="${JSON.stringify(this.kc_growthParameter)}"></acc-calculation>
        <acc-calculation function="kc_date" param="${JSON.stringify(this.kc_dateParamter)}"></acc-calculation>
        <acc-calculation function="etaw" param="${JSON.stringify(this.etawParameter)}"></acc-calculation>
      </ucd-theme-collapse>
      <br />
    </div>
    
`;
}