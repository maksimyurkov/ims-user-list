import "@polymer/polymer/lib/elements/dom-module.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";

const $IMSUserListGridCustomTheme = html`<dom-module id="grid-custom-theme" theme-for="vaadin-grid">
  <template>
    <style>
      [part~="row"] {}

      [part~="cell"] {
        background-color: var(--ims-user-list-grid-background);
      }

      [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        background: var(--ims-user-list-grid-background);
        padding: 8px 16px;
      }

      /* ::-webkit-scrollbar-track {
        display: none;
      }

      ::-webkit-scrollbar-track {
        background: var(--ims-user-list-grid-background);
      }

      ::-webkit-scrollbar {
        width: 8px;
        background:var(--ims-user-list-grid-background);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--secondary-text-color);
      } */
    </style>
  </template>
</dom-module>`;

document.head.appendChild($IMSUserListGridCustomTheme.content);
