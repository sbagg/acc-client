import { html } from 'lit';
import cssProps from '@ucd-lib/theme-sass/css-properties.css';

export function render() { 
    return html`
    
<style>
  ${cssProps}

  :host {
    display: block;
    min-width: 360px;
    background-color:white;
  }
  /* creating css loader */

  /* #loading {
      width: 2rem;
      height: 2rem;
      border: 5px solid #f3f3f3;
      border-top: 6px solid #9c41f2;
      border-radius: 100%;
      margin: auto;
      display: none;
      animation: spin 1s infinite linear;
  }
  #loading.display {
      display: block;
  }
  @keyframes spin {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
  } */
  /* #loading {
    width: 100%;
    min-height: 700px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  #loading img {
    animation: showLoading 400ms ease-in;
  }
  @keyframes showLoading {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  #loading img {
    animation: showLoading 400ms ease-in;
  }
  .loading-dots {
    text-align: center;
    z-index: 5;
    color: var(--acc-tcolor-primary);
  } */

  /* .dot {
    display: inline;
    margin-left: 0.2em;
    margin-right: 0.2em;
    position: relative;
    font-size: 3.5em;
    opacity: 0;
    animation: showHideDot 2.5s ease-in-out infinite;
  }
  .dot.one { animation-delay: 0.2s; }
  .dot.two { animation-delay: 0.4s; }
  .dot.three { animation-delay: 0.6s; }
  @keyframes showHideDot {
    0% { opacity: 0; }
    50% { opacity: 1; }
    60% { opacity: 1; }
    100% { opacity: 0; }
  } */


  #masthead {
    width: 100%;
    height: var(--acc-masthead-height);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #masthead .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #masthead .logo {
    height: var(--acc-masthead-logo-height);
  }
  #masthead .hamburger {
    color: var(--acc-tcolor-primary70);
    left: 15px;
    width: 24px;
    height: 24px;
    z-index: 1;
  }
  #masthead .hamburger::after{
    content: "";
    background-color: #fff;
    opacity: .75;
    z-index: -1;
    height: var(--acc-masthead-height);
    left: -9px;
    width: 39px;
    position: absolute;
    cursor: pointer;
  }
  #masthead .hamburger:hover {
    color: var(--acc-tcolor-link-hover-text);
  }
  #app-mobile-menu {
    background-color: #fff;
    width: 100%;
    position: absolute;
    height: calc(100% - var(--acc-masthead-height));
    z-index: 100;
    top: var(--acc-masthead-height);
    display: flex;
    flex-direction: column;
  }
  #app-mobile-menu .container {
    margin: 0;
    padding: 0 24px;
    width: calc(100% - 48px);
  }
  #app-mobile-menu .search-box {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  #app-mobile-menu rp-search {
    width: 100%;
    max-width: 100%;
  }
  #app-mobile-menu .nav-links {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  #app-mobile-menu .nav-links a {
    display: flex;
    height: 50px;
    padding-left: 14px;
    align-items: center;
    color: var(--acc-tcolor-primary);
    text-decoration: none;
    font-weight: var(--acc-font-weight-bold);
  }
  #app-mobile-menu .nav-links a:hover {
    color: var(--acc-tcolor-link-hover-text);
  }
  #app-mobile-menu a.login-button {
    font-size: var(--acc-font-size);
    font-weight: var(--acc-font-weight-bold);
    padding: 15px 50px;
    cursor: pointer;
    transition: .3s;
    color: var(--acc-tcolor-primary);
    display: block;
    text-decoration: none;
    background-color: var(--acc-tcolor-bg-primary);
    margin-top: 20px;
  }
  #app-mobile-menu a.login-button:hover {
    background-color: var(--acc-tcolor-hover-bg);
    color: var(--acc-tcolor-light);
  }
  #app-mobile-menu .account {
    flex-grow: 1;
    background-color: var(--acc-tcolor-bg-primary);
    padding-top: 24px;
  }
  #app-mobile-menu .greeting {
    font-size: var(--acc-font-size-h2);
    font-weight: var(--acc-font-weight-bold);
    padding-bottom: 16px;
    padding-top: 15px;
  }
  #app-header-content {
    position: relative;
    /* box-shadow: 0 2px 1px rgba(0,40,85,0.15); */
  }
  #app-header-content:after {
    content: "";
    height: 2px;
    /* Expand element */
    position: absolute;
    left: 0px;
    /* top: 0px; */
    right: 0px;
    bottom: 0px;
    -moz-box-shadow: inset 0 2px 1px rgba(0,40,85,0.15);
    -webkit-box-shadow: inset 0 2px 1px rgba(0,40,85,0.15);
    box-shadow: 0 2px 1px rgba(0,40,85,0.15);
    /* Disable click events */
    pointer-events: none;
  }
  #desktop-menu {
    display: none;
  }
  #nav-container {
    min-height: 66px;
  }
  #nav-left {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  [quick-search-opened] #nav-left {
    display: none;
  }
  #nav-left a {
    padding: 15px 12px;
    text-transform: uppercase;
  }
  #nav-left a:first-child {
    padding-left: 0;
  }
  #nav-left a.selected {
    background-color: var(--acc-tcolor-secondary);
  }
  #nav-left a:hover {
    color: var(--acc-tcolor-link-hover-text) !important;
  }
  #nav-right {
    flex: 1;
    margin-left: 10px;
  }
  #close-quick-search {
    display: none;
  }
  [quick-search-opened] #close-quick-search {
    display: inline-block;
  }
  .nav-help {
    display: none;
  }
  .nav-grants {
    display: none;
  }
  #app-footer {
    background-color: var(--acc-tcolor-primary);
    color: var(--acc-tcolor-light);
    padding: 40px 0;
    font-size: var(--acc-font-size-small);
  }
  #app-footer .logo-line {
    padding: 40px 0;
  }
  #app-footer .logo-line .logo {
    width: 250px;
  }
  #app-footer .logo-line hr {
    border-color: rgba(255,255,255,0.25);
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
  }
  #app-footer .logo-line  hr:first-of-type {
    margin-right: 15px;
  }
  #app-footer .logo-line  hr:last-of-type {
    margin-left: 15px;
  }
  #app-footer .footer-top {
    display: block;
  }
  #app-footer .footer-top .logo {
    max-width: 200px;
    height: auto;
  }
  #app-footer a {
    text-decoration: underline;
    color: var(--acc-tcolor-light);
  }
  #app-footer .address {
    line-height: 1.75;
  }
  #app-footer .title {
    font-weight: var(--acc-font-weight-bold);
    font-size : var(--acc-font-size-h3);
    margin-bottom: 10px;
    margin-top: 20px;
  }
  #app-footer .col-item {
    padding: 5px 0;
  }
  @media (min-width: 480px) {
    #desktop-menu {
      display: flex;
    }
    #nav-left a {
      padding: 20px;
    }
  }
  
  @media (min-width: 600px) {
    #nav-left {
      display: flex !important;
    }
    #nav-right {
      max-width: 275px;
    }
    #close-quick-search {
      display: none !important;
    }
  }
  @media (min-width: 500px) {
    .nav-help {
      display: inline-block !important;
    }
  }
  @media (min-width:425px) {
    .nav-grants {
      display: inline-block !important;
    }
  }
  @media (min-width: 800px) {
    #nav-left a:first-child {
      padding-left: 20px;
    }
    #app-footer .footer-top {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: auto auto auto auto;
    }
    #app-footer .footer-column {
      max-width: 250px;
    }
    #app-footer .title {
      margin-top: 0;
    }
  }
  @media( max-width: 565px)  {
    .hide-hec lp {
      display: none;
    }
  }
</style>
<div class="page">
<ucd-theme-header
  site-name="UC Davis Library"
  slogan="Aggie Crop Calculator"
  figure-src="../images/book-logo.png" 
  prevent-fixed
 >

  <ucd-theme-primary-nav>
    <a href="#table">Table</a>
    <a href="#chart">Charts</a>
    <a href="#pdf">PDF</a>
    <a href="#calculation">Calculation</a>
    <a href="#help">Help</a>
  </ucd-theme-primary-nav>

  <ucd-theme-quick-links title="Profile Login" style-modifiers="highlight">
    <a href="#">Login</a>
  </ucd-theme-quick-links>

</ucd-theme-header>

  <ucdlib-pages id="pages" selected="${this.loading ? this.selectedPage : "loading"}" ></ucdlib-pages>


<div id="app-footer" ?hidden="${this.page == 'app-mobile-menu'}">
  <div class="container">
    <div class="footer-top">
      <div>
        ${this.theme.libraryLogo? html`<a href="${this.theme.libraryUrl}"><img class="logo" alt="Logo" src="${this.theme.libraryLogo}"></a>` : html``}
        <div class="address mt-4">
        ${this.theme.libraryAddress? this.theme.libraryAddress.map(line => html`<div>${this.renderHTML(line)}</div>`) : html`` }
        </div>
        ${this.theme.libraryEmail ? html`<div class="mt-4"><a href="mailto:${this.theme.libraryEmail}">${this.theme.libraryEmail}</a></div>`: html`` }
      </div>
      ${this._renderFooterColumns()}
    </div>
    <div class="flex align-items-center logo-line">
      <hr class="flex-grow-1">
      ${this.theme.universityLogo? html`<a href="${this.theme.universityUrl}"><img class="logo" alt="Logo" src="${this.theme.universityLogo}"></a>` : html``}
      <hr class="flex-grow-1">
    </div>
    ${this.theme.footerLines? this.theme.footerLines.map(line => html`<div class="flex align-items-center flex-wrap justify-content-center mb-3">${this.renderHTML(line)}</div>`) : html``}
  </div>
</div>
</div>
`;
}