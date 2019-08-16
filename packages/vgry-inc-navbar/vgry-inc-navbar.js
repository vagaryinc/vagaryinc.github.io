import { LitElement, html, css } from 'lit-element';
import { defaultBodyType } from '../styles/index.js';

class VgryIncNavBar extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          color: #fff;
          width: 100%;
        }

        .nav-bar {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          height: 44px;
          width: 100%;
          z-index: 10;
        }

        .nav-bar__title {
          ${defaultBodyType}
          margin-right: auto;
        }

        .nav-bar__menu {
          cursor: pointer;
          margin-left: auto;
        }
      `,
    ];
  }

  render() {
    return html`
      <nav class="nav-bar">
        <div class="nav-bar__title">
          Vagary
        </div>
        <div class="nav-bar__menu" @click="${this._handleMenuClick}">
          =
        </div>
      </nav>
    `;
  }

  _handleMenuClick() {
    this.dispatchEvent(
      new CustomEvent('menu-clicked', {
        bubbles: true,
      }),
    );
  }
}

customElements.define('vgry-inc-navbar', VgryIncNavBar);
