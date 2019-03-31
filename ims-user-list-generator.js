"use strict";
import { LitElement, html, css } from "lit-element";

import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-input/paper-textarea.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import "@polymer/paper-fab/paper-fab.js";
import "@polymer/paper-toast/paper-toast.js";

class IMSUserListGenerator extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          --primary-color: #607d8b;
          --paper-tabs-selection-bar-color: var(--primary-color);
          --paper-tab-ink: var(--primary-color);
          --paper-fab-background: var(--primary-color);
          --paper-fab-keyboard-focus-background: var(--primary-color);
          --paper-spinner-stroke-width: 2px;
        }

        paper-tab {
          font-size: 16px;
        }

        paper-item {
          cursor: pointer;
        }

        paper-toggle-button {
          margin-top: 16px;
        }

        section {
          margin-top: 16px;
        }

        paper-textarea {
          color: red;
        }

        textarea {
          width: 1px;
          position: fixed;
          height: 1px;
          left: 0;
          top: 0;
          z-index: -999999;
        }

        paper-spinner {
          width: 48px;
          height: 48px;
        }

        h1 {
          font-weight: 300;
        }

        #container {
          max-width: 800px;
          margin: auto;
        }

        #spinner-container {
          display: flex;
          height: 150px;
          justify-content: center;
          align-items: center;
        }

        .copy-text {
          margin-top: 20px;
        }

        #actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        [hidden],
        #spinner-container[hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { activeTab, loading } = this;
    return html`
    <iron-iconset-svg size="24" name="ims-user-list-generator">
        <svg>
            <defs>
                <g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
                <g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
            </defs>
        </svg>
    </iron-iconset-svg>
        <div id="container">
            <h1>Создание ims-user-list</h1>
            <paper-tabs selected="${activeTab}" scrollable attr-for-selected="value" @selected-item-changed="${e => {
      if (this.activeTab === "result") this.generate();
      this.activeTab = e.target.selected;
    }}">
              <paper-tab value="common">Общие настройки</paper-tab>
              <paper-tab value="used">Данные пользователей</paper-tab>
              <paper-tab value="localization">Локализация</paper-tab>
              <paper-tab value="style">Стили</paper-tab>
              <paper-tab value="result">Результат</paper-tab>
            </paper-tabs>
            <section id="common" ?hidden="${activeTab !== "common"}">
              <paper-input property-name="rootURL" label="URL до директории ims-user-list"></paper-input>
              <paper-input property-name="serverURL" label="URL до сервера"></paper-input>
              <paper-input property-name="width" label="Ширина"></paper-input>
              <paper-input property-name="height" label="Высота"></paper-input>
              <paper-input property-name="pageSize" property-type="number" label="Количество подгружаемых за запрос пользователей"></paper-input>
              <paper-toggle-button property-name="showAvatar">Отображать аватар</paper-toggle-button>
              <paper-toggle-button property-name="textAvatar">Отображать текстовый аватар в списке</paper-toggle-button>
              <paper-toggle-button property-name="voiceInput">Голосовой ввод</paper-toggle-button>
              <paper-toggle-button property-name="showNoFoundImage">Отображать изображение "Ничего не найдено"</paper-toggle-button>
              <paper-toggle-button property-name="showFound">Отображать количество найденных пользователей</paper-toggle-button>
              <paper-toggle-button property-name="oldBrowsersSupport">Поддержка старых версий браузеров (IE11 и др.)</paper-toggle-button>
              <paper-toggle-button property-name="demoMode">Режим демонстрации</paper-toggle-button>
            </section>
             <section id="used" ?hidden="${activeTab !== "used"}">
              <p>Отображаемые данные пользователей</p>
              <paper-toggle-button property-name="avatarURL">Ссылка на аватар</paper-toggle-button>
              <paper-toggle-button property-name="displayName">Отображаемое имя</paper-toggle-button>
              <paper-toggle-button property-name="nickname">Никнейм</paper-toggle-button>
              <paper-toggle-button property-name="position">Должность</paper-toggle-button>
              <paper-toggle-button property-name="subdivision">Подразделение</paper-toggle-button>
              <paper-toggle-button property-name="email">Email</paper-toggle-button>
              <paper-toggle-button property-name="systemEmail">Рабочий Email</paper-toggle-button>
              <paper-toggle-button property-name="phone">Телефон</paper-toggle-button>
              <paper-toggle-button property-name="mobilePhone">Мобильный телефон</paper-toggle-button>
              <paper-toggle-button property-name="address">Адрес</paper-toggle-button>
              <paper-toggle-button property-name="accountURL">Ссылка подробнее</paper-toggle-button>
            </section>
            <section id="localization" ?hidden="${activeTab !==
              "localization"}">
              <paper-dropdown-menu label="Язык" no-animations @value-changed="${
                this.updateLanguageVariables
              }">
                <paper-listbox slot="dropdown-content"--primary-color selected="0">
                  <paper-item .value="${"ru_RU"}">Русский</paper-item>
                  <paper-item .value="${"en_US"}">English</paper-item>
                  <paper-item .value="${"other"}">Другой</paper-item>
                </paper-listbox>
              </paper-dropdown-menu>
              <paper-input property-name="Found users" label="Найдено пользователей"></paper-input>
              <paper-input property-name="Loading data" label="Загрузка данных"></paper-input>
              <paper-input property-name="Nothing found" label="Ничего не найдено"></paper-input>
              <paper-input property-name="Search" label="Поиск"></paper-input>
              <paper-input property-name="Clear Search Box" label="Очистить поле поиска"></paper-input>
              <paper-input property-name="Start typing the user's full name" label="Начните вводить ФИО"></paper-input>
              <paper-input property-name="Voice input" label="Голосовой ввод"></paper-input>
              <paper-input property-name="Not specified" label="Не указано"></paper-input>
              <paper-input property-name="Nickname" label="Никнейм"></paper-input>
              <paper-input property-name="Position" label="Должность"></paper-input>
              <paper-input property-name="Subdivision" label="Подразделение"></paper-input>
              <paper-input property-name="Email" label="Email"></paper-input>
              <paper-input property-name="Worker Email" label="Рабочий Email"></paper-input>
              <paper-input property-name="Phone" label="Телефон"></paper-input>
              <paper-input property-name="Mobile phone" label="Мобильный телефон"></paper-input>
              <paper-input property-name="Address" label="Адрес"></paper-input>
              <paper-input property-name="Read more" label="Подробнее"></paper-input>
            </section>
            <section id="style" ?hidden="${activeTab !== "style"}">
              <paper-input property-name="--ims-user-list-accent-color" label="Основной цвет" placeholder="#83b735"></paper-input>
              <paper-input property-name="--ims-user-list-second-accent-color" label="Второй основной цвет" placeholder="#039be5"></paper-input>
              <paper-input property-name="--ims-user-list-primary-text-color" label="Основной цвет текста" placeholder="#212121"></paper-input>
              <paper-input property-name="--ims-user-list-secondary-text-color" label="Второстепенный цвет текста" placeholder="#737373"></paper-input>
              <paper-input property-name="--ims-user-list-blocks-border-radius" label="Радиус границ блоков" placeholder="2px"></paper-input>
              <paper-input property-name="--ims-user-list-avatar-border-radius" label="Радиус границы аватара" placeholder="50%"></paper-input>
              <paper-input property-name="--ims-user-list-link-color" label="Цвет ссылки" placeholder="#4285f4"></paper-input>
              <paper-input property-name="--ims-user-list-search-background" label="Цвет фона блока поиска" placeholder="#ffffff"></paper-input>
              <paper-input property-name="--ims-user-list-search-border" label="Граница поиска" placeholder="none"></paper-input>
              <paper-input property-name="--ims-user-list-search-box-shadow" label="Тень поиска" placeholder="0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)"></paper-input>
              <paper-input property-name="--ims-user-list-grid-background" label="Цвет фона списка пользователей" placeholder="#eeeeee"></paper-input>
              <paper-input property-name="--ims-user-list-grid-border" label="Граница списка" placeholder="none"></paper-input>
              <paper-input property-name="--ims-user-list-grid-box-shadow" label="Тень списка" placeholder="0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)"></paper-input>
              <paper-input property-name="--ims-user-list-grid-loading-background" label="Цвет фона списка пользователей" placeholder="#ffffff"></paper-input>
              <paper-input property-name="--ims-user-list-grid-item-background" label="Цвет фона элемента списка" placeholder="#ffffff"></paper-input>
              <paper-input property-name="--ims-user-list-grid-item-border" label="Цвет границы блока" placeholder="none"></paper-input>
              <paper-input property-name="--ims-user-list-grid-item-box-shadow" label="Тень элемента списка" placeholder="0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)"></paper-input>
              <paper-input property-name="--ims-user-list-grid-item-ripple-color" label="Цвет при нажатии на элемент списка" placeholder="#737373"></paper-input>
              <paper-input property-name="--ims-user-list-dialog-background" label="Цвет фона модального окна" placeholder="#ffffff"></paper-input>
              <paper-input property-name="--ims-user-list-dialog-user-info-tooltip-background" label="Цвет фона всплывающих подсказок" placeholder="#616161"></paper-input>
              <paper-input property-name="--ims-user-list-dialog-user-info-tooltip-text-color" label="Цвет текста в всплывающих подсказках" placeholder="#ffffff"></paper-input>
            </section>
            <section id="result" ?hidden="${activeTab !== "result"}">
              <div id="spinner-container" ?hidden="${!loading}">
                <paper-spinner active></paper-spinner>
              </div>
              <div ?hidden="${loading}">
                <p class="copy-text">Разместите HTML код вашей системе</p>
                <paper-textarea label="Сформированный код" rows="6"></paper-textarea>
                <div id="actions">
                  <paper-fab icon="ims-user-list-generator:content-copy" @click="${
                    this.copy
                  }"></paper-fab>
                </div>
                <textarea></textarea>
                <paper-toast text="Скопировано"></paper-toast>
              </div>
            </section>
        </div>
`;
  }

  static get properties() {
    return {
      activeTab: { type: String },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.activeTab = "common";
    this.defaultOptions = {
      rootURL: "/node_modules/@maksimyurkov/ims-user-list",
      serverURL: "/node_modules/@maksimyurkov/ims-user-list/api/webtutor.html",
      width: "100%",
      height: "600px",
      pageSize: 300,
      showAvatar: true,
      textAvatar: true,
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
  }

  firstUpdated() {
    this.setOptions(this.defaultOptions);
  }

  async setOptionsValues(sectionName, options) {
    for (let propertyName in options) {
      if (options.hasOwnProperty(propertyName)) {
        let element = this.shadowRoot.querySelector(
          `#${sectionName} [property-name="${propertyName}"]`
        );
        if (element !== null) {
          let tagName = element.tagName;
          let value = options[`${propertyName}`];

          if (tagName === "PAPER-INPUT") element.value = value;
          if (tagName === "PAPER-TOGGLE-BUTTON") element.checked = value;
        }
      }
    }
  }

  async getOptionsValues(sectionName) {
    let options = {};
    let elements = this.shadowRoot.querySelectorAll(
      `section#${sectionName} > *`
    );
    for (let element of elements) {
      let tagName = element.tagName;
      let propertyName = element.getAttribute("property-name");
      if (tagName === "PAPER-INPUT") {
        let value = element.value;
        let propertyType = element.getAttribute("property-type");
        if (propertyType === "number") value = +value;
        options[propertyName] = value;
      }
      if (tagName === "PAPER-TOGGLE-BUTTON") {
        let value = element.checked;
        options[propertyName] = value;
      }
    }
    return options;
  }

  async setOptions(options) {
    await this.setOptionsValues("common", options);
    await this.setOptionsValues("used", options.usedData);
    await this.setOptionsValues("localization", options.localization);
    await this.setOptionsValues("style", options.customCSSProperties);
  }

  async updateLanguageVariables() {
    let selectedItem = this.shadowRoot.querySelector("paper-dropdown-menu")
      .selectedItem;
    if (selectedItem === null) return;
    let value = selectedItem.value;
    let data = {};
    if (value !== "other") {
      let response = await fetch(`../languages/${value}.json`, {
        method: "GET",
        mode: "cors",
        credentials: "include"
      });
      data = await response.json();
    }
    await this.setOptionsValues("localization", data);
  }

  copy() {
    const input = this.shadowRoot.querySelector("textarea");
    input.value = this.shadowRoot.querySelector("paper-textarea").value;
    input.select();
    input.select();
    document.execCommand("copy");
    this.shadowRoot.querySelector("paper-toast").open();
  }

  async generate() {
    this.loading = true;
    let defaultOptions = this.defaultOptions;
    let options = await this.getOptionsValues("common");
    options.usedData = await this.getOptionsValues("used");
    options.localization = await this.getOptionsValues("localization");
    options.customCSSProperties = await this.getOptionsValues("style");
    // Delete unchanged properties
    for (let name in options) {
      if (options[name] === defaultOptions[name]) {
        delete options[name];
      }
    }
    for (let name in options.usedData) {
      if (options.usedData[name] === defaultOptions.usedData[name]) {
        delete options.usedData[name];
      }
    }
    if (Object.keys(options.usedData).length === 0) delete options["usedData"];
    for (let name in options.localization) {
      if (options.localization[name] === defaultOptions.localization[name]) {
        delete options.localization[name];
      }
    }
    if (Object.keys(options.localization).length === 0)
      delete options["localization"];
    for (let name in options.customCSSProperties) {
      if (
        options.customCSSProperties[name] ===
        defaultOptions.customCSSProperties[name]
      ) {
        delete options.customCSSProperties[name];
      }
    }
    if (Object.keys(options.customCSSProperties).length === 0)
      delete options["customCSSProperties"];
    let rootURL = options.rootURL;
    if (rootURL === undefined) rootURL = defaultOptions.rootURL;
    if (rootURL === "/") rootURL = "";

    let code = `<!-- START ims-user-list -->${
      options.oldBrowsersSupport !== false
        ? `\n<script src="${rootURL}/dist/vendor/webcomponents-loader.js"></script>
<script nomodule src="${rootURL}/dist/vendor/fetch.js"></script>
<script nomodule src="${rootURL}/dist/vendor/babel-helpers.min.js"></script>
<script nomodule src="${rootURL}/dist/vendor/regenerator-runtime.min.js"></script>`
        : ""
    }
<ims-user-list></ims-user-list>${
      Object.keys(options).length > 0
        ? `\n<script>
document.querySelector("ims-user-list").options = ${JSON.stringify(
            options,
            null,
            "\t"
          )};
</script>`
        : ``
    }
${
      options.oldBrowsersSupport !== false
        ? `<script nomodule src="${rootURL}/dist/ims-user-list.es5.js"></script>\n`
        : ""
    }<script type="module" src="${rootURL}/dist/ims-user-list.js"></script>
<!-- END ims-user-list -->`;
    this.shadowRoot.querySelector("paper-textarea").value = code;
    this.loading = false;
  }
}

customElements.define("ims-user-list-generator", IMSUserListGenerator);
