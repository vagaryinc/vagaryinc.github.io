import { LitElement, html } from 'lit-element';

class VgryIncNavMenu extends LitElement {
  render() {
    return html`
      <style>
        .menu {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .menu-header {
          height: 44px;
          display: flex;
          width: 100%;
          align-items: center;
        }

        .menu-header__close {
          margin-left: auto;
          text-align: center;
        }

        .menu__item {
          font-size: 32px;
          height: 44px;
        }

        .menu__link {
          color: #000;
          text-decoration: none;
          margin: 0;
          padding: 0;
        }
      </style>

      <header class="menu-header">
        <div class="menu-header__close" @click="${this._handleMenuCloseClicked}">X</div>
      </header>
      <ul class="menu">
        <li class="menu__item">
          <a href="#/home" class="menu__link" @click="${this._handleLinkClicked}">
            Home
          </a>
        </li>
        <li class="menu__item">
          <a href="#/portfolio" class="menu__link" @click="${this._handleLinkClicked}">
            Portfolio
          </a>
        </li>
        <li class="menu__item">
          <a href="#/contact" class="menu__link" @click="${this._handleLinkClicked}">
            Contact
          </a>
        </li>
        <li class="menu__item">
          <a href="#/about" class="menu__link" @click="${this._handleLinkClicked}">
            About
          </a>
        </li>
      </ul>
    `;
  }

  /**
   *
   * @param {MouseEvent} evt Event data of the click made on the menu link.
   * @event menu-link-clicked
   */
  _handleLinkClicked(evt) {
    evt.preventDefault();

    // Send out the route corresponding to the link that's clicked. In this
    // case, the route is considered to be the part of the link.href after the
    // # sign. Note that this assumes that there is only 1 # symbol in href.
    this.dispatchEvent(
      new CustomEvent('menu-link-clicked', {
        detail: evt.srcElement.href.split('#')[1],
        bubbles: true,
      }),
    );
  }

  _handleMenuCloseClicked() {
    this.dispatchEvent(
      new CustomEvent('menu-close-clicked', {
        bubbles: true,
      }),
    );
  }
}

customElements.define('vgry-inc-navmenu', VgryIncNavMenu);
