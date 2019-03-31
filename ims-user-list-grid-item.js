"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-ripple/paper-ripple.js";

import "@lrnwebcomponents/paper-avatar/paper-avatar.js";

class IMSUserListGridItem extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
        }

        paper-avatar {
          --paper-avatar-width: 40px;
          cursor: pointer;
        }

        paper-ripple {
          color: var(--ims-user-list-grid-item-ripple-color);
        }

        #container {
          display: flex;
          position: relative;
          padding: 16px;
          /* margin: 4px; */
          cursor: pointer;
          overflow: visible;
          border-radius: var(--ims-user-list-blocks-border-radius);
          border: var(--ims-user-list-grid-item-border);
          background: var(--ims-user-list-grid-item-background);
          box-shadow: var(--ims-user-list-grid-item-box-shadow);
        }

        .avatar {
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: var(--ims-user-list-avatar-border-radius);
          margin-right: 16px;
        }

        .info {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: center;
        }

        .name {
          font-size: 16px;
          font-weight: 600;
          white-space: normal;
          color: var(--ims-user-list-primary-text-color);
        }

        .position {
          font-size: 14px;
          white-space: normal;
          color: var(--ims-user-list-secondary-text-color);
        }
      `
    ];
  }

  render() {
    const { data } = this;
    return html`
    <div id="container" @click="${_ => {
      this.dispatchEvent(
        new CustomEvent("show-user-info", {
          bubbles: true,
          composed: true,
          detail: data.id
        })
      );
    }}">
      ${
        data.showAvatar
          ? html`${
              data.avatarURL === "" || data.textAvatar
                ? html`<paper-avatar class="avatar" label="${
                    data.displayName
                  }"></paper-avatar>`
                : html`<img class="avatar" src="${data.avatarURL}" alt="${
                    data.displayName
                  }">`
            }`
          : null
      }
        <div class="info">
          <div class="name">${data.displayName}</div>
          ${
            data.position !== ""
              ? html`<div class="position">${data.position}</div>`
              : null
          }
        </div>
        <paper-ripple></paper-ripple>
    </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define("ims-user-list-grid-item", IMSUserListGridItem);
