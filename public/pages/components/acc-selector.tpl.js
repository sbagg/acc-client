import { html, css } from 'lit';
import brandCss from '@ucd-lib/theme-sass/4_component/_index.css'
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
export function styles() {
    const elementStyles = css`
      :host {
        display: block;
      }
      #selectorpicker {

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
      #selectorpicker {
        width:25px;
      }
      .field-container{
        width:150px;
      }
    
    </style>
      <fieldset>
        <div class="field-container">
            <label for="selectpicker">Select</label>
            <select id="selectpicker">
                ${this.dbName.map(label =>
                  html`<option>${label}</option>`
                )}
            </select>
        </div>
    </fieldset>
    <p><button @click=${this.clickSelector} class="btn btn--primary"><slot name="selectorTitle">Select</slot></button></p>
    
`;
}