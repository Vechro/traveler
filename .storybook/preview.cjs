import { setCustomElementsManifest } from "@storybook/web-components";

import customElementsManifest from "../src/components/custom-elements.json";

setCustomElementsManifest(customElementsManifest);

// TODO: Remove support of 0.x CustomElementManifest format in 7.0
// import customElements from '../custom-elements-experimental.json';
// setCustomElements(customElements);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
