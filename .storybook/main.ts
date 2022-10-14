import { StorybookConfig } from "@storybook/web-components-vite";

export default <StorybookConfig>{
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions"],
  framework: {
    name: "@storybook/web-components-vite",
  },
  staticDirs: ["../public"],
};
