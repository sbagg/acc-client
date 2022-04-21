import { html } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'

export function render() { 
    return html`
    
    <style>
        ${brandCss}

      :host {
        display: block;
      }
    
    </style>
    <canvas id="myChart" width=${this.width} height=${this.height}></canvas>
    
`;
}