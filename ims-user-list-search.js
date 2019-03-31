"use strict";
import { LitElement, html, css } from "lit-element";

import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/paper-icon-button";

import "./ims-user-list-search-speech-mic.js";

class IMSUserListSearch extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          z-index: 1;
        }

        input {
          outline: none;
          border: none;
          width: 100%;
          font-size: 16px;
          color: var(--ims-user-list-primary-text-color);
          height: 54px;
          margin-left: 16px;
          background: var(--ims-user-list-search-background);
        }

        input:-ms-input-placeholder {
          color: var(--ims-user-list-secondary-text-color);
        }

        ::-ms-clear {
          display: none;
        }

        paper-icon-button {
          min-width: 40px;
          margin: 0 2px;
          padding: 0 8px;
          color: var(--ims-user-list-secondary-text-color);
        }

        #container {
          display: flex;
          align-items: center;
          border: var(--ims-user-list-search-border);
          border-radius: var(--ims-user-list-blocks-border-radius);
          background: var(--ims-user-list-search-background);
          box-shadow: var(--ims-user-list-search-box-shadow);
          transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0 8px;
          height: 56px;
        }
      `
    ];
  }

  render() {
    const { searchText, showClearButton, options } = this;
    return html`
    <iron-iconset-svg size="24" name="ims-user-list-search-icons">
        <svg>
            <defs>
                <g id="search">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </g>
                <g id="arrow-back">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
      ${
        showClearButton
          ? html`<paper-icon-button id="clear-toggle" alt="${
              options.localization["Clear Search Box"]
            }" toggles icon="ims-user-list-search-icons:arrow-back"
            @click="${this._clear}"></paper-icon-button>`
          : html`<paper-icon-button id="search-button" alt="${
              options.localization["Search"]
            }" toggles icon="ims-user-list-search-icons:search" @click="${
              this._search
            }"></paper-icon-button>`
      }
        <input type="text" aria-label="${
          options.localization["Start typing the user's full name"]
        }" autofocus value="${searchText}"
            placeholder="${
              options.localization["Start typing the user's full name"]
            }" @change="${e => {
      this._onInputChange(e);
    }}" @keyup="${e => {
      this._onInputKeyUp(e);
    }}">
    ${
      options.voiceInput
        ? html`<ims-user-list-search-speech-mic continuous .options="${options}" @result="${e =>
            this._micResult(e)}" ></ims-user-list-search-speech-mic>`
        : null
    }
    </div>
`;
  }

  static get properties() {
    return {
      showClearButton: { type: Boolean },
      options: { type: Object },
      searchText: { type: String }
    };
  }

  constructor() {
    super();
    this.searchText = "";
    this.showClearButton = false;
    this._currentTimerId = undefined;
  }

  firstUpdated() {
    this._updateClearButtonState();
  }

  get input() {
    return this.shadowRoot.querySelector("input");
  }

  _updateClearButtonState() {
    this.input.value !== ""
      ? (this.showClearButton = true)
      : (this.showClearButton = false);
  }

  _onInputChange() {
    this._updateClearButtonState();
  }

  _onInputKeyUp(e) {
    this._updateClearButtonState();
    if (this._currentTimerId !== undefined) {
      clearTimeout(this._currentTimerId);
      this._currentTimerId = undefined;
    }
    if (e.keyCode === 13) {
      this._search();
      return;
    }
    this._currentTimerId = setTimeout(_ => {
      this._search();
    }, 400);
  }

  _search() {
    let searchText = this.input.value.trim();
    this._dispatchSearchInputChangedEvent(searchText);
  }

  toggleFilter() {
    this.opened = !this.opened;
  }

  _clear() {
    this.input.value = "";
    this._updateClearButtonState();
    this._dispatchSearchInputChangedEvent("");
  }

  _dispatchSearchInputChangedEvent(value) {
    this.dispatchEvent(
      new CustomEvent("search-input-changed", {
        bubbles: true,
        composed: true,
        detail: value
      })
    );
  }

  _micResult(e) {
    if (e.detail.completeTranscript === undefined) return;
    this.input.value = e.detail.completeTranscript.trim();
    this._search();
    this._updateClearButtonState();
  }
}

customElements.define("ims-user-list-search", IMSUserListSearch);
