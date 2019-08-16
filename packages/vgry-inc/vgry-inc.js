import { LitElement, html } from 'lit-element';
import '../vgry-inc-home-page/vgry-inc-home-page.js';
import '../vgry-inc-navbar/vgry-inc-navbar.js';
import '../vgry-inc-navmenu/vgry-inc-navmenu.js';

class VgryInc extends LitElement {
  constructor() {
    super();
    this.route = '/home';
    this.isMenuActive = false;
  }

  static get properties() {
    return {
      isMenuActive: {
        type: Boolean,
        reflect: true,
        attribute: 'is-menu-active',
      },

      route: { type: String },
    };
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          position: relative;
          /* overflow-x: hidden; */
        }

        main {
          display: flex;
          flex-direction: row;
        }

        .navbar {
          box-sizing: border-box;
          padding-left: 16px;
          padding-right: 16px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          width: 100%;
          overflow-x: hidden;
        }

        .menunav {
          background-color: #fff;
          box-sizing: border-box;
          position: absolute;
          /* FIX:  */
          display: none;
          height: 100vh;
          width: 100vw;
          padding-left: 16px;
          padding-right: 16px;
          transform: translateX(100%);
          transition: 0.2s transform ease-out;
          top: 0;
          right: 0;
          z-index: 10;
        }

        .menunav.active {
          display: block;
          transform: translateX(0);
        }

        .home-page {
          height: calc(100vh - 44px);
        }
      </style>

      <vgry-inc-navbar class="navbar" @menu-clicked="${this._handleMenuClicked}"></vgry-inc-navbar>
      <vgry-inc-navmenu
        class="menunav ${this.isMenuActive ? 'active' : ''}"
        @menu-close-clicked="${this._handleHandleMenuCloseClicked}"
        @menu-link-clicked="${this._handleMenuLinkClicked}"
      >
      </vgry-inc-navmenu>

      <div class="pages">
        <vgry-inc-home-page class="home-page"></vgry-inc-home-page>
      </div>
    `;
  }

  _handleMenuClicked() {
    this.isMenuActive = true;
  }

  _handleHandleMenuCloseClicked() {
    this.isMenuActive = false;
  }

  _handleMenuLinkClicked({ detail }) {
    this.route = detail;
    // TODO: create a lookup table to handle possible 404s;
    console.log(this.route);
  }
}

customElements.define('vgry-inc', VgryInc);
