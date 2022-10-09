const config = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-actions", "@storybook/addon-controls"],
  framework: "@storybook/web-components",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    babelModeV7: true,
    storyStoreV7: true,
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return config;
  },
};

module.exports = config;