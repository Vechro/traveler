import { setCustomElements } from "@storybook/web-components-vite";
import customElements from "../src/components/custom-elements.json";

setCustomElements(customElements);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};