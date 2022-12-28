import type { StorybookConfig } from "@storybook/web-components-vite";

export default {
  stories: ["../src/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-actions"],
  framework: {
    name: "@storybook/web-components-vite",
  },
} as StorybookConfig;
