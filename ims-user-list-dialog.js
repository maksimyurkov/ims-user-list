"use strict";
import { LitElement, html, css } from "lit-element";

import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-spinner/paper-spinner.js";

import "./ims-user-list-dialog-user-info.js";
import { serverRequest } from "./ims-user-list-helper-functions.js";
import { _IMSUserListDialogStyles } from "./ims-user-list-dialog-styles.js";

class IMSUserListDialog extends LitElement {
  static get styles() {
    return [
      css`
        [hidden] {
          display: none;
        }

        paper-icon-button {
          color: var(--secondary-text-color);
        }
      `
    ];
  }

  render() {
    const { loading, userData, options, dialogId } = this;
    return html`
    <iron-iconset-svg size="24" name="${dialogId}-icons">
        <svg>
            <defs>
                <g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
            </defs>
        </svg>
    </iron-iconset-svg>
      <paper-dialog id="${dialogId}" with-backdrop>
      <div id="spinner-container" ?hidden="${!loading}"></div>
      <paper-dialog-scrollable ?hidden="${loading}">
        <paper-icon-button id="close" icon="${dialogId}-icons:close" dialog-dismiss></paper-icon-button>
        <ims-user-list-dialog-user-info .data="${userData}" .options="${options}"></ims-user-list-dialog-user-info>
      </paper-dialog-scrollable>
    </paper-dialog>
`;
  }

  static get properties() {
    return {
      userData: { type: Object },
      loading: { type: Boolean },
      options: { type: Object },
      dialogId: { type: String }
    };
  }

  constructor() {
    super();
    this.userData = {};
    this.dialogId = `ims-user-list-dialog-${Math.floor(
      Math.random() * 1000000
    )}`;
  }

  firstUpdated() {
    this._initDialog();
  }

  _initDialog() {
    // Move paper-dialog in document body to make dialog over all document elements
    this.dialog = this.shadowRoot.querySelector("paper-dialog");
    document.body.appendChild(this.dialog);
    let style = document.createElement("style");
    style.id = `${this.dialogId}-styles`;
    style.innerHTML = _IMSUserListDialogStyles(
      this.dialogId,
      this.options.customCSSProperties
    );
    document.body.appendChild(style);
  }

  async createSpinner() {
    let dialogSpinnerContainer = document.body.querySelector(
      `#${this.dialogId} #spinner-container`
    );
    dialogSpinnerContainer.innerHTML = `<paper-spinner active></paper-spinner>`;
    let dialogSpinner = document.body.querySelector(
      `#${this.dialogId} #spinner-container paper-spinner`
    );
    window.ShadyCSS.styleSubtree(dialogSpinner, {
      "--paper-spinner-stroke-width": "2px"
    });
    window.ShadyCSS.styleSubtree(dialogSpinner, {
      "--paper-spinner-layer-1-color": this.options.customCSSProperties[
        "--ims-user-list-accent-color"
      ]
    });
    window.ShadyCSS.styleSubtree(dialogSpinner, {
      "--paper-spinner-layer-2-color": this.options.customCSSProperties[
        "--ims-user-list-second-accent-color"
      ]
    });
    window.ShadyCSS.styleSubtree(dialogSpinner, {
      "--paper-spinner-layer-3-color": this.options.customCSSProperties[
        "--ims-user-list-accent-color"
      ]
    });
    window.ShadyCSS.styleSubtree(dialogSpinner, {
      "--paper-spinner-layer-4-color": this.options.customCSSProperties[
        "--ims-user-list-second-accent-color"
      ]
    });
    return;
  }

  async showUserInfo(userId) {
    const options = this.options;
    this.loading = true;
    this.userId = userId;
    // Need create spinner everytime for correct working css variables in paper-spinner in IE11 and other old browsers
    await this.createSpinner();
    this.dialog.open();
    const data = await serverRequest(
      options.serverURL,
      {
        route: "user",
        userId: userId,
        usedData: options.usedData
      },
      options.demoMode
    );
    if (this.userId !== userId) return;
    this.userData = data;
    this.loading = false;
    this.dialog.notifyResize();
  }
}

customElements.define("ims-user-list-dialog", IMSUserListDialog);
