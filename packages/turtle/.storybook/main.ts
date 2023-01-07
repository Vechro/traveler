import type { StorybookConfig } from "@storybook/web-components-vite";

export default {
  stories: ["../src/**/*.stories.ts"],
  addons: ["@storybook/addon-actions"],
  framework: {
    name: "@storybook/web-components-vite",
  },
} satisfies StorybookConfig;
