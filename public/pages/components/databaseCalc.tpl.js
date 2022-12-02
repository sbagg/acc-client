import { html, css } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import tableHtml from '@ucd-lib/theme-sass/1_base_html/_index.css'
import tableCss from '@ucd-lib/theme-sass/2_base_class/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
export function styles() {
    const elementStyles = css`
      :host {
        display: block;
      }

    `;
  
    return [elementStyles, buttonStyles, tableHtml, tableCss];
  }

export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${tableHtml}
        ${tableCss}
      :host {
        display: block;
      }
    </style>

    <div>
        <h1>Database Calculation</h1>
        ${console.log(this.kcData)}
    </div>
    
`;
}