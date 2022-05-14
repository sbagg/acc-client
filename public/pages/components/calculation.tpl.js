import { html, css } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import tableHtml from '@ucd-lib/theme-sass/1_base_html/_index.css'
import tableCss from '@ucd-lib/theme-sass/2_base_class/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
import layoutCss from "@ucd-lib/theme-sass/5_layout/_index.css.js";


export function render() { 
    return html`
    
    <style>
        ${brandCss}
        ${tableHtml}
        ${tableCss}
        ${buttonStyles}
        ${layoutCss}
      :host {
        display: block;
      }
      #question-box {
        display: table-cell; 
        height: inherit;
        width:50%;
      }
      #solution-box {
          display: table-cell;
          background-color: var(--acc-color-blue70);
          color: var(--acc-color-white);
          text-align: center;
          vertical-align: middle;
          height: inherit;
      }
      .notDeveloped {
        text-align: center;
        vertical-align: middle;
        background-color: var(--acc-color-blue70);
        color: var(--acc-color-white);
        height: 200px;
      }
      #table {
        display: table-row; 
        vertical-align: middle;
      }
      .field-container{
          width: 225px;
      }
      #result {
          color: white;
      }
      @media only screen and (max-width: 900px) {
        /* For mobile phones: */
        #question-box, #solution-box, #table{
            display: block; 
        }
      }
    
    </style>    
    <ucd-theme-collapse title="${this.function.toUpperCase()}">
    ${this.param.length == 0 ? 
    html `
    <div class="notDeveloped">
        <h3 style="color:white;">
            In Development...<br/>
            Come back later!
        </h3>
    </div>
    `
    :html`
        <div style="width: 100%; display: table;">
            <div id="table">
                <div id="question-box">
                    ${this.param.map(p => html`
                        <div class="field-container">
                            <label for="text">${p.name} <abbr title="${p.info}">*</abbr></label>
                            <input name="${this.function}" id="${p.name}" type="text" placeholder="${p.info}" pattern="[\.\[\]0-9,!? ]*">
                        </div>
                    `)}
                    <p><button @click=${this.clickSelector} id="selectButton" class="btn btn--primary"><slot name="selectorTitle">Select</slot></button></p>
                </div>
                <div id="solution-box"> 
                    <h3 style="color:white;">The ${this.function} solution is:</h3>
                    <br/>
                    ${this.result ? html`<h3 id="result">${this.result}</h3>`: html``}
                </div>
            </div>
        </div>
    `}

    </ucd-theme-collapse>

    
`;
}