import type { StorybookConfig } from "@storybook/web-components-vite";

export default {
  stories: [{
    directory: "../src/components",
    files: "**/*.stories.ts"
  }],
  addons: ["@storybook/addon-actions"],
  framework: "@storybook/web-components-vite",
} satisfies StorybookConfig;
