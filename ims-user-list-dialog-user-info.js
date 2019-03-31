"use strict";
import { LitElement, html, css } from "lit-element";

import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-tooltip";

import "@lrnwebcomponents/paper-avatar/paper-avatar.js";

import { customCSSPropertiesForStyle } from "./ims-user-list-custom-css-properties.js";

class IMSUserListDialogUserInfo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
        }

        paper-avatar {
          --paper-avatar-width: 128px;
        }

        paper-tooltip {
          --paper-tooltip-background: var(
            --ims-user-list-dialog-dialog-user-info-tooltip-background
          );
          --paper-tooltip-opacity: 1;
          --paper-tooltip-text-color: var(
            --ims-user-list-dialog-dialog-user-info-tooltip-text-color
          );
        }

        #container {
          padding: 32px 16px;
        }

        #avatar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .avatar {
          width: 128px;
          height: 128px;
          min-width: 128px;
          min-height: 128px;
          border-radius: var(--ims-user-list-avatar-border-radius);
        }

        #displayName,
        #nickname {
          word-wrap: break-word;
          overflow: hidden;
          width: 100%;
        }

        #displayName {
          font-size: 24px;
          color: var(--ims-user-list-primary-text-color);
          line-height: 1.42;
          font-weight: 500;
          margin: 0;
          padding: 0;
          margin-top: 16px;
        }

        #nickname {
          font-size: 16px;
          font-weight: 500;
          margin-top: 8px;
          color: var(--ims-user-list-secondary-text-color);
        }

        #info {
          margin-top: 24px;
          width: 100%;
          max-width: 300px;
          word-break: break-word;
        }

        .info {
          display: flex;
          align-items: center;
          color: var(--ims-user-list-secondary-text-color);
          margin-bottom: 12px;
          position: relative;
          text-align: left;
        }

        .icon-block {
          display: flex;
          align-items: center;
        }

        .info iron-icon {
          margin-right: 8px;
          color: var(--ims-user-list-secondary-text-color);
          min-width: 18px;
          min-height: 18px;
          width: 18px;
          height: 18px;
        }

        #read-more {
          margin-top: 16px;
          text-align: center;
        }

        #read-more a,
        #read-more-link {
          color: var(--ims-user-list-link-color);
          text-decoration: none;
        }

        #read-more-icon iron-icon {
          width: 20px;
          height: 20px;
        }
      `
    ];
  }

  render() {
    const { data, options } = this;
    return html`
    <!-- Add custom css properties (fix for IE11) -->
    <style>
      :host {
        ${customCSSPropertiesForStyle(options.customCSSProperties)};
      }
    </style>
    <iron-iconset-svg size="24" name="ht-user-list-dialog-user-info-icons">
        <svg>
          <defs>
            <g id="position"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g>
            <g id="subdivision"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></g>
            <g id="email"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
            <g id="system-mail"><path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"></path></g>
            <g id="address"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
            <g id="phone"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></g>
            <g id="smartphone"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
            <g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
          </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container">
        <div id="avatar-container">
            ${
              options.showAvatar
                ? html`${
                    data.avatarURL === undefined
                      ? html`<paper-avatar class="avatar" label="${
                          data.displayName
                        }"></paper-avatar>`
                      : html`<img class="avatar" src="${data.avatarURL}" alt="${
                          data.displayName
                        }">`
                  }`
                : null
            }
            <div id="displayName">${
              data.displayName
                ? html`${data.displayName}`
                : options.localization["Not specified"]
            }</div>

            ${
              data.nickname
                ? html`<div><div id="nickname">${
                    data.nickname
                  }<paper-tooltip position="bottom" animation-delay="0" offset="4">${
                    options.localization["Nickname"]
                  }</paper-tooltip></div></div>`
                : null
            }

            <div id="info">
              <!-- Position -->
              ${
                data.position && data.position !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:position"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Position"]
              }</paper-tooltip>
            </div>
            <div class="text">${data.position}</div>
            </div>`
                  : null
              }
               <!-- Subdivision -->
              ${
                data.subdivision && data.subdivision !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:subdivision"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Subdivision"]
              }</paper-tooltip>
            </div>
            <div class="text">${data.subdivision}</div>
            </div>`
                  : null
              }
              <!-- Email -->
              ${
                data.email && data.email !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:email"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Email"]
              }</paper-tooltip>
            </div>
            <div class="text">${data.email}</div>
            </div>`
                  : null
              }
              <!-- System Email -->
              ${
                data.systemEmail && data.systemEmail !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:system-mail"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Worker Email"]
              }</paper-tooltip>
            </div>
            <div class="text">${data.systemEmail}</div>
            </div>`
                  : null
              }
              <!-- Phone -->
              ${
                data.phone && data.phone !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:phone"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Phone"]
              }</paper-tooltip>
            </div>
            <div class="text" x-ms-format-detection="none">${data.phone}</div>
            </div>`
                  : null
              }
              <!-- Mobile phone -->
              ${
                data.mobilePhone && data.mobilePhone !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:smartphone"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Mobile phone"]
              }</paper-tooltip>
            </div>
            <div class="text" x-ms-format-detection="none">${
              data.mobilePhone
            }</div>
            </div>`
                  : null
              }
              <!-- Address -->
              ${
                data.address && data.address !== ""
                  ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-list-dialog-user-info-icons:address"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">${
                options.localization["Address"]
              }</paper-tooltip>
            </div>
            <div class="text">${data.address}</div>
            </div>`
                  : null
              }
              <!-- Read more -->
              ${
                data.accountURL
                  ? html` <div id="read-more">
                <a id="read-more-icon" href="${
                  data.accountURL
                }" target="_blank" rel="noopener noreferrer">
                  <iron-icon icon="ht-user-list-dialog-user-info-icons:launch"></iron-icon>
                </a>
                <a id="read-more-link" href="${
                  data.accountURL
                }" target="_blank" rel="noopener noreferrer">${
                      options.localization["Read more"]
                    }</a>
              </div>`
                  : null
              }
            </div>
        </div>
      </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object },
      options: { type: Object }
    };
  }

  constructor() {
    super();
    this.data = {};
  }
}

customElements.define(
  "ims-user-list-dialog-user-info",
  IMSUserListDialogUserInfo
);
