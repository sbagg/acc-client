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
      .center-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      section{
        padding: 10px 10px;
      }
      section:nth-child(even) {
          background-color: #f9f9f9;
      }
      
    
    </style>
    <div class="l-full-width">
      <h1 class="page-title u-space-mb--large">Acc Component</h1>
    </div>
    <section>
        <h2>PDF View</h2>
        <p>This uses many keywords to create a pdf view, including the following: 
          <ul>
            <li><code>title</code>: The title of the PDF. Default is PDF</li>
          </ul> 
          <acc-pdf></acc-pdf>
       </p>
      </section>
      <section>
        <h2>Chart View</h2>
        <p>This uses many keywords to create a chart view, including the following: 
          <ul>
            <li><code>title</code>: The title of the Chart. Default is Chart</li>
          </ul> 
          <acc-chart></acc-chart>
       </p>
      </section>
      <section>
        <h2>Factoid</h2>  
          <p>Factoids are small components of a statistic,title,icon and link, that are
          typically used to display a brief datum, with a link to more information.  The
          factoids are an encompassing div tag with some bracket decoration.</p>
          
          <p>Factoids can be generated using only the CSS styling included in the ucdlib-theme, but they can be pretty complicated.</p>
          <acc-factoid href="http://library.ucdavis.edu" statistic="40" title="Cats">
            <span style="font-size:100px;">⑁</span>
          </acc-factoid>
          <div class="l-3col layout-columns" style="margin-top:25px">
          
              <acc-factoid href="http://library.ucdavis.edu" statistic="4,000,000" title="Books">
                <span><ucdlib-icon slot="ucdIcon" style="margin:auto;width:135px;height:135px;"  icon="autorenew"  size=24></ucdlib-icon></span>
              </acc-factoid>
          
              <acc-factoid href="http://library.ucdavis.edu" statistic="800" title="Scorpus IDs">
                <span><ucdlib-icon style="margin:auto;width:135px;height:135px;"  icon="academic:scopus" ></ucdlib-icon></span>
              </acc-factoid>
          
              <acc-factoid href="http://library.ucdavis.edu" statistic="5000" title="Seats">
                <span><ucdlib-icon style="margin:auto;width:135px;height:135px;"  icon="academic:stackoverflow" ></ucdlib-icon></span>
              </acc-factoid>
          
          </div> 
      </section>
      <section>
        <h2>Selectors</h2>
        <p>This is a selector for choosing which database to choose from:
          <ul>
            <li><code>title</code>: The title of the Chart. Default is Chart</li>
          </ul> 
          <acc-selector><p slot="selectorTitle">Sample DB Selector</p></acc-selector>
       </p>
      </section>
    
`;
}