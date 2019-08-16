import { LitElement, html, css } from 'lit-element';
import { defaultBodyType } from '../styles/index.js';
import bg from '../../assets/images/pf/misc/9-21.jpg';

class VgryIncHomePage extends LitElement {
  constructor() {
    super();
    this._designsList = ['Home', 'Condo', 'Apartment', 'Office', 'Cafe', 'Restaurant', 'Bar'];

    this._currentDesign = 0;

    this._designType = this._designsList[this._currentDesign];

    setInterval(() => {
      this._currentDesign = (this._currentDesign + 1) % this._designsList.length;
      this._designType = this._designsList[this._currentDesign];
    }, 1500);
  }

  static get properties() {
    return {
      _currentDesign: { type: Number },
      _designType: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          ${defaultBodyType}
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: relative;
        }

        .buttons {
          margin-top: 16px;
          margin-left: 16px;
        }

        .main-content {
          margin: auto;
        }

        .tagline-title {
          color: #fff;
          font-family: sans-serif;
          font-size: 58px;
          line-height: 58px;
          text-align: left;
          word-break: break-word;
          margin-bottom: 0;
          margin-left: 16px;
        }

        .image {
          box-sizing: border-box;
          background-color: #000;
          height: 100vh;
          width: 100%;
          margin: 0;
          overflow: hidden;
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
        }

        .image__item {
          position: relative;
          height: 100%;
          width: auto;
          left: -60%;
          opacity: 0.5;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="main-content">
        <h1 class="tagline-title">
          Bespoke design for your
          <div>${this._designType}</div>
        </h1>
        <div class="buttons">
          <button>Get in touch</button>
          <button>See our work</button>
        </div>
      </div>
      <section class="image">
        <img class="image__item" src="${bg}" alt="kitchen" />
      </section>
    `;
  }
}

customElements.define('vgry-inc-home-page', VgryIncHomePage);
