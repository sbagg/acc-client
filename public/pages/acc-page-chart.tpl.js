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
      <h1 class="page-title u-space-mb--large">Acc Chart</h1>
    </div>

    <div class="content-box">
      
    </div>

    

    
`;
}