import { html, css } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
export function styles() {
    const elementStyles = css`
      :host {
        display: block;
      }
    `;
  
    return [elementStyles, buttonStyles];
  }

export function render() { 
    return html`
    
    <style>
        ${brandCss}

      :host {
        display: block;
      }
    
    </style>
    <div id="pdfFrame"></div>
    <p><button @click=${this.savePDF} class="btn btn--primary">Open in new Browser</button></p>
    
`;
}