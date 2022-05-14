import { LitElement, html } from 'lit';
import {render} from "./acc.tpl.js";

import "./acc-page-home"
import "./acc-page-chart"
import "./acc-page-about"
import "./acc-page-pdf"
import "./acc-page-calculation"
import "./acc-page-table"
import "./acc-page-component"
import "./acc-page-error"
import "./acc-page-loading"


import '@ucd-lib/theme-elements/brand/ucd-theme-header/ucd-theme-header.js'
import "@ucd-lib/theme-elements/brand/ucd-theme-primary-nav/ucd-theme-primary-nav.js";
import "@ucd-lib/theme-elements/brand/ucd-theme-quick-links/ucd-theme-quick-links.js";
import "@ucd-lib/theme-elements/brand/ucd-theme-search-popup/ucd-theme-search-popup.js";
import "@ucd-lib/theme-elements/brand/ucd-theme-search-form/ucd-theme-search-form.js";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-branding-bar/ucdlib-branding-bar.js";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-pages/ucdlib-pages.js";

import '@polymer/iron-pages';
import config from "../config";
import AccUtilsDataCollection from "./utils/acc-utils-data-collection";


class AccApp extends AccUtilsDataCollection {

  static get properties() {
    return {
      elements : {type: Array},
      selectedPage : {type: String}
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.theme = config.theme;
    this.selectedPage = '';
    this.elements = [];

    this.version = "alpha";
    window.addEventListener('hashchange', async e => {
      let page = window.location.hash.replace(/^#/, '');
      if( !PAGES.includes('acc-page-'+page) ) return;
      this.selectedPage = page;
    });
    
  }



  firstUpdated() {
    let root = this.shadowRoot.querySelector('#pages');

    for( let eleName of PAGES ) {
      let ele = document.createElement(eleName);
      ele.id = eleName.replace(/^acc-page-/, '');
      root.appendChild(ele);
    }

    this.elements = PAGES.map(name => name.replace(/^acc-page-/, ''));
    this.selectedPage = window.location.hash.replace(/^#/, '') || PAGES[0].replace(/^acc-page-/, '');
  }

  _onSelectChange() {
    window.location.hash = this.shadowRoot.querySelector('#elementSelector').value;
  }

  renderHTML(html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    return doc.body;   
  }

  /**
   * @method _renderFooterColumns
   * @description Renders the site footer columns
   * 
   * @returns {TemplateResult}
   */
   _renderFooterColumns(){
    let columnTemplates = [];
    let prefix = "footerColumn";
    for (let i of ["1","2","3"]) {
      let col = prefix + i;
      if (this.theme[col]) {
        columnTemplates.push(
          html`<div class="footer-column">
            ${this.theme[col].title ? html`<div class="title">${this.theme[col].title}</div>` : html``}
            ${this.theme[col].content ? html`${this.theme[col].content.map(line => html`<div class="col-item">${this.renderHTML(line)}</div>`)}` : html``}
          </div>`
        );
      }
    }

    if (columnTemplates.length > 0) {
      return html`${columnTemplates}`;
    }
    return html``;
  }
}

customElements.define('aggie-crop-calculator', AccApp);