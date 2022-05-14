import { html, css } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import tableHtml from '@ucd-lib/theme-sass/1_base_html/_index.css'
import tableCss from '@ucd-lib/theme-sass/2_base_class/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${tableHtml}
        ${tableCss}
        ${buttonStyles}
      :host {
        display: block;
      }
      .container{
        height:350px;
        overflow:scroll;
      }
    
    </style>
    <div class="container">
    <div class="responsive-table" role="region" aria-label="Scrollable Table" tabindex="0">
    <table class="table--hover">
    <thead>
    <tr>
      ${this.label.map(lab => html`
        ${lab.map(header => html`
            <th>${header}</th> 
        `)} 
      `)}
    </tr>
    </thead>
    <tbody>   
      ${this.data.map(lab => html`
        <tr>
        ${lab.map(column => html`
            <td>${column}</td>
        `)}
        </tr>
      `)}
    </tbody>
  </table>
</div>
</div>
<span>
  <p><button @click=${this.exportCSV} id="exportButton" class="btn btn--primary">Export to CSV</button></p>
  <p><button @click=${this.exportExcel} id="exportButton" class="btn btn--alt">Export to Excel</button></p>
</span>

`;
}