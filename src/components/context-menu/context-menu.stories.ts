import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./context-menu";
import "../context-menu-item";

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
    <context-menu>
      <div slot="menu-items">
        <context-menu-item>Foo</context-menu-item>
        <context-menu-item>Bar</context-menu-item>
        <context-menu-item>Baz</context-menu-item>
      </div>
      <section class="container">
        <p>Open context menu in here</p>
      </section>
    </context-menu>
  `,
};
