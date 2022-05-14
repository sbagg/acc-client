import { html } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'

export function render() { 
    return html`
    
    <style>
        ${brandCss}

      :host {
        display: block;
      }
      .content-box {
        margin: 0 35px;
      }
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">About ACC</h1>
      <div class="content-box">
        <h2>About AggieCrop</h2>

        <p>California has the country's most diverse set of commercial agricultural crops, 
          some of the best weather for crop yields, but also some serious limitations; 
          in particular water.  Crop management is a robust area for research, especially 
          in the University of California Davis where agricultural studies are at the 
          forefront. Making research data available to the California farmer is challenging; 
          as a data management issue, as a presentation issue; and in concerns with the 
          proper use of the data.</p>
        <br>
        <h2>Our Goal</h2>

        <p>ACC is a application whose goal is to:</p>
        <ul class="list--arrow">
          <li>standardizing data format and management</li>
          <li>allowing consistent access to the data</li>
          <li>providing a good means to create usable presentations of the data</li>
        </ul> 
        <p>Another element of this web application would be the development of predictive 
          scenarios based on the scientific data, with the functions also stored in the 
          system.</p>
      </div>
    </div>
    
`;
}