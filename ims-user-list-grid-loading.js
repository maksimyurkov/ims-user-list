"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-spinner/paper-spinner.js";

class IMSUserListGridLoading extends LitElement {
  static get styles() {
    return [
      css`
        paper-spinner {
          --paper-spinner-stroke-width: 2px;
          --paper-spinner-layer-1-color: var(--ims-user-list-accent-color);
          --paper-spinner-layer-2-color: var(
            --ims-user-list-second-accent-color
          );
          --paper-spinner-layer-3-color: var(--ims-user-list-accent-color);
          --paper-spinner-layer-4-color: var(
            --ims-user-list-second-accent-color
          );
          width: 32px;
          height: 32px;
          margin-right: 16px;
        }

        #container {
          position: absolute;
          top: calc(50% - 32px);
          left: calc(50% - 96px);
        }

        #spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          align-content: center;
          background: var(--ims-user-list-grid-loading-background);
          color: var(--ims-user-list-secondary-text-color);
          padding: 16px;
          border-radius: 3px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
      `
    ];
  }

  render() {
    const { text } = this;
    return html`
      <div id="container">
        <div id="spinner"> <paper-spinner active></paper-spinner> ${text}</div>
    </div>
`;
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }
}

customElements.define("ims-user-list-grid-loading", IMSUserListGridLoading);
