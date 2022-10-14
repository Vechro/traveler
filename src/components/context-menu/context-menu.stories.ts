import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./context-menu";

export default {
  component: "context-menu",
};

export const Default: StoryObj = {
  render: () => html`
    <style>
      .container {
        width: 300px;
        height: 200px;
        border: 1px solid black;
        padding-inline: 0.5rem;
      }
    </style>
    <section class="container">
      <p>Open context menu in here</p>
      <context-menu>
        <button>Foo</button>
        <button>Bar</button>
        <button>Baz</button>
      </context-menu>
    </section>
  `,
};
