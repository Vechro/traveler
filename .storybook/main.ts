import { StorybookConfig } from "@storybook/web-components-vite";

export default <StorybookConfig>{
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/web-components-vite",
  },
  staticDirs: ["../public"],
};
