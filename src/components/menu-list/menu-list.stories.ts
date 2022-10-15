import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./menu-list";
import "../menu-item";
export default {
  component: "menu-list",
};

export const Default: StoryObj = {
  render: () => html`
    <style>
      .container {
        margin: 0;
        width: 300px;
        height: 200px;
      }
    </style>
    <section class="container">
      <menu-list>
        <menu-item>Item #1</menu-item>
        <menu-item>Item #2</menu-item>
        <menu-item>Item #3</menu-item>
      </menu-list>
    </section>
  `,
};
