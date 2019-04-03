"use strict";
import { LitElement, html, css } from "lit-element";

import "./ims-user-list-search.js";
import "./ims-user-list-grid.js";
import "./ims-user-list-dialog.js";

import { customCSSPropertiesForStyle } from "./ims-user-list-custom-css-properties.js";

class IMSUserList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          font-size: 14px;
        }

        ims-user-list-grid {
          height: calc(100% - 56px);
        }
      `
    ];
  }

  render() {
    const { readyOptions } = this;
    return html`
      <style>
      :host {
        width: 100%;
        height: 100%;
        max-width: ${readyOptions.width};
        max-height: ${readyOptions.height};
        ${customCSSPropertiesForStyle(readyOptions.customCSSProperties)};
      }
      </style>
      <ims-user-list-search .options="${readyOptions}"></ims-user-list-search>
      <ims-user-list-grid .options="${readyOptions}"></ims-user-list-grid>
      <ims-user-list-dialog .options="${readyOptions}"></ims-user-list-dialog>
    `;
  }

  static get properties() {
    return {
      readyOptions: {
        type: Object
      }
    };
  }

  firstUpdated() {
    this.shadowRoot.addEventListener("search-input-changed", e => {
      e.stopPropagation();
      const searchText = e.detail;
      this.grid.getUsers(searchText);
    });
    this.shadowRoot.addEventListener("show-user-info", e => {
      e.stopPropagation();
      const userId = e.detail;
      this.dialog.showUserInfo(userId);
    });
  }

  constructor() {
    super();
    let options = {
      rootURL: "/node_modules/@maksimyurkov/ims-user-list",
      serverURL: "/node_modules/@maksimyurkov/ims-user-list/api/webtutor.html",
      width: "100%",
      height: "600px",
      pageSize: 300,
      showAvatar: true,
      textAvatar: true,
      resizeImage: false,
      voiceInput: true,
      showNoFoundImage: true,
      showFound: true,
      oldBrowsersSupport: true,
      demoMode: false,
      usedData: {
        avatarURL: true,
        displayName: true,
        nickname: true,
        position: true,
        subdivision: true,
        email: true,
        systemEmail: true,
        phone: true,
        mobilePhone: true,
        address: true,
        accountURL: true
      },
      localization: {
        // ims-user-list-grid
        "Found users": "Найдено пользователей",
        "Loading data": "Загрузка данных",
        "Nothing found": "Ничего не найдено",
        // ims-user-list-search
        Search: "Поиск",
        "Clear Search Box": "Очистить поле поиска",
        "Start typing the user's full name": "Начните вводить ФИО",
        // ims-user-list-search-speech-mic
        "Voice input": "Голосовой ввод",
        // ims-user-list-dialog-user-info
        "Not specified": "Не указано",
        Nickname: "Никнейм",
        Position: "Должность",
        Subdivision: "Подразделение",
        Email: "Email",
        "Worker Email": "Рабочий Email",
        Phone: "Телефон",
        "Mobile phone": "Мобильный телефон",
        Address: "Адрес",
        "Read more": "Подробнее"
      },
      customCSSProperties: {
        "--ims-user-list-accent-color": "#83b735",
        "--ims-user-list-second-accent-color": "#039be5",
        "--ims-user-list-primary-text-color": "#212121",
        "--ims-user-list-secondary-text-color": "#737373",
        "--ims-user-list-blocks-border-radius": "2px",
        "--ims-user-list-avatar-border-radius": "50%",
        "--ims-user-list-link-color": "#4285f4",
        "--ims-user-list-search-background": "#ffffff",
        "--ims-user-list-search-border": "none",
        "--ims-user-list-search-box-shadow":
          "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
        "--ims-user-list-grid-background": "#eeeeee",
        "--ims-user-list-grid-border": "none",
        "--ims-user-list-grid-box-shadow":
          "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
        "--ims-user-list-grid-loading-background": "#ffffff",
        "--ims-user-list-grid-item-background": "#ffffff",
        "--ims-user-list-grid-item-border": "none",
        "--ims-user-list-grid-item-box-shadow":
          "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
        "--ims-user-list-grid-item-ripple-color": "#737373",
        "--ims-user-list-dialog-background": "#ffffff",
        "--ims-user-list-dialog-user-info-tooltip-background": "#616161",
        "--ims-user-list-dialog-user-info-tooltip-text-color": "#ffffff"
      }
    };
    // Set custom options
    let customOptions = this.options;
    if (customOptions !== null) {
      for (let name in customOptions) {
        if (
          name === "usedData" ||
          name === "localization" ||
          name === "customCSSProperties"
        ) {
          for (let optionName in customOptions[name]) {
            if (customOptions[name].hasOwnProperty(optionName)) {
              options[name][optionName] = customOptions[name][optionName];
            }
          }
        } else {
          options[name] = customOptions[name];
        }
      }
    }
    this.readyOptions = options;
  }

  get grid() {
    return this.shadowRoot.querySelector("ims-user-list-grid");
  }

  get dialog() {
    return this.shadowRoot.querySelector("ims-user-list-dialog");
  }
}

customElements.define("ims-user-list", IMSUserList);
