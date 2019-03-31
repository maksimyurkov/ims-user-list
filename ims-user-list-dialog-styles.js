import { customCSSPropertiesForStyle } from "./ims-user-list-custom-css-properties.js";

export function _IMSUserListDialogStyles(dialogId, customCSSProperties) {
  return `
  #${dialogId}, #${dialogId} ims-user-list-dialog-user-info, #${dialogId} paper-spinner {
    ${customCSSPropertiesForStyle(customCSSProperties)}
  }

  #${dialogId} paper-dialog-scrollable {
    position: relative;
    padding: 0;
    margin: 0;
  }

  #${dialogId} paper-icon-button#close {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 48px;
    height: 48px;
    z-index: 9;
    color: ${customCSSProperties["--ims-user-list-secondary-text-color"]};
  }

  #${dialogId} {
    margin-left: 0;
    margin-right: 0;
    max-width: 470px;
    width: 100%;
    z-index: 99999;
    min-height: 160px;
    background: ${customCSSProperties["--ims-user-list-dialog-background"]};
  }

  #${dialogId} #spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    height: 200px;
    margin:auto;
  }

  #${dialogId} paper-spinner {
    width: 48px;
    height: 48px;
    margin: auto;
  }

  @media (max-width: 534px) {
    #${dialogId} {
      margin: 0;
      width: 100vw;
      min-height: 100vh;
      max-width: 100vw;
    }

    #${dialogId} #spinner-container {
      height: 100vh;
      margin: 0;
    }
  }
`;
}
