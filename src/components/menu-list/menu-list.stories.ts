import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./menu-list";
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
        padding: 0.5rem;
      }
    </style>
    <section class="container">
      <menu-list>
        <div>Item #1</div>
        <div>Item #2</div>
        <div>Item #3</div>
      </menu-list>
    </section>
  `,
};
