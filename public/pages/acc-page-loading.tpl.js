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
        min-height: 600px;

      }
      .text-box{
        padding-top:150px;
        text-align: center;
        padding-bottom: 25px;

      }
      #loading {
        width: 5rem;
        height: 5rem;
        border: 5px solid #f3f3f3;
        border-top: 6px solid var(--acc-color-farmers-market);
        border-radius: 100%;
        margin: auto;
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    </style>
    <div class="content-box">
      <div class="text-box">
        <h1>Hold On...</h1>
        <h1>We Are <span style="color: var(--acc-color-farmers-market)">Planting</span> Some Data For You!</h1>
      </div>
      <div id="loading"></div>

    </div>

`;
}