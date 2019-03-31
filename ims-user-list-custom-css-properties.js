export function customCSSPropertiesForStyle(cssProperties) {
  let cssVariables = ``;
  for (let property in cssProperties) {
    if (cssProperties.hasOwnProperty(property)) {
      cssVariables += `${property}: ${cssProperties[property]};`;
    }
  }
  return cssVariables;
}
