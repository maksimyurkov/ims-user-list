"use strict";
import { LitElement, html, css } from "lit-element";
import { render } from "lit-html";

import "@vaadin/vaadin-grid/vaadin-grid.js";

import "./ims-user-list-grid-styles.js";
import "./ims-user-list-grid-loading.js";
import "./ims-user-list-grid-nothing-found-placeholder.js";
import "./ims-user-list-grid-item.js";

import { serverRequest } from "./ims-user-list-helper-functions.js";

class IMSUserListGrid extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
        }

        vaadin-grid {
          border: var(--ims-user-list-grid-border);
          border-radius: var(--ims-user-list-blocks-border-radius);
          background-color: var(--ims-user-list-grid-background);
          box-shadow: var(--ims-user-list-grid-box-shadow);
          min-height: 100%;
        }

        #container {
          box-sizing: border-box;
          font-weight: normal;
          height: 100%;
        }

        #found {
          color: var(--ims-user-list-secondary-text-color);
          line-height: 48px;
        }

        #found span {
          font-weight: 500;
        }
      `
    ];
  }

  render() {
    const { options, loading, usersNumber } = this;
    return html`
    <style>
      #grid-container {
        height: ${options.showFound ? "calc(100% - 48px);" : "100%;"};
        position: relative;
      }
    </style>
    <div id="container">
      ${
        options.showFound
          ? html`<div id="found">${
              options.localization["Found users"]
            }: <span>${usersNumber}</span></div>`
          : null
      }
      <div id="grid-container">
        <vaadin-grid theme="no-row-borders" .size="${usersNumber}" .pageSize="${
      options.pageSize
    }">
          <vaadin-grid-column flex-grow="2" .renderer="${this.itemRenderer.bind(
            this
          )}"></vaadin-grid-column>
        </vaadin-grid>
        ${
          loading
            ? html`<ims-user-list-grid-loading text="${
                options.localization["Loading data"]
              }"></ims-user-list-grid-loading>`
            : null
        }
        ${
          !loading && usersNumber === 0
            ? html`<ims-user-list-grid-nothing-found-placeholder text="${
                options.localization["Nothing found"]
              }" .showImage="${
                options.showNoFoundImage
              }"></ims-user-list-grid-nothing-found-placeholder>`
            : null
        }
      </div>
    </div>
`;
  }

  static get properties() {
    return {
      options: { type: Object },
      loading: { type: Boolean },
      users: { type: Array },
      usersNumber: { type: Number }
    };
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid");
  }

  firstUpdated() {
    this.getUsers();
  }

  constructor() {
    super();
    this.options = {};
    this.loading = false;
    this.usersNumber = 0;
  }

  getUsers(searchText) {
    let options = this.options;
    this.grid.dataProvider = async function(params, callback) {
      this.loading = true;
      const data = await serverRequest(
        options.serverURL,
        {
          route: "users",
          searchText: searchText || "",
          page: params.page,
          pageSize: params.pageSize
        },
        options.demoMode
      );
      const users = data.users;
      const totalSize = data.totalSize;
      this.usersNumber = totalSize;
      callback(users, totalSize);
      this.loading = false;
    }.bind(this);
  }

  itemRenderer(root, column, rowData) {
    const options = this.options;
    const itemData = {
      showAvatar: options.showAvatar,
      textAvatar: options.textAvatar,
      id: rowData.item.id,
      avatarURL: rowData.item.avatarURL,
      displayName: rowData.item.displayName,
      position: rowData.item.position
    };
    const htmlData = html`<ims-user-list-grid-item .data="${itemData}"></ims-user-list-grid-item>`;
    render(htmlData, root);
  }
}

customElements.define("ims-user-list-grid", IMSUserListGrid);
