import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./context-menu";
import "../menu-item";

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
        padding: 1rem;
      }
    </style>
    <context-menu>
      <div slot="menu-items">
        <menu-item>Foo</menu-item>
        <menu-item>Bar</menu-item>
        <menu-item>Baz</menu-item>
      </div>
      <section class="container">
        <p>Open context menu in here</p>
      </section>
    </context-menu>
  `,
};
