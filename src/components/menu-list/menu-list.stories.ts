import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./menu-list";
import "../context-menu-item";
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
        <context-menu-item>Item #1</context-menu-item>
        <context-menu-item>Item #2</context-menu-item>
        <context-menu-item>Item #3</context-menu-item>
      </menu-list>
    </section>
  `,
};
