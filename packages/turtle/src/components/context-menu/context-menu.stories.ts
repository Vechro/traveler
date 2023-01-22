import { action } from "@storybook/addon-actions";
import type { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../menu-item";
import "../menu-list";
import "./context-menu";
import type { ContextMenu } from "./context-menu";

export default {
  component: "context-menu",
};

export const Default: StoryObj<ContextMenu> = {
  render: () =>
    html`
      <style>
        .container {
          width: 300px;
          height: 200px;
          border: 1px solid black;
          padding: 1rem;
        }
      </style>
      <context-menu @open=${(event: CustomEvent) => action("open")(event)}>
        <menu-list slot="context-menu">
          <menu-item>Foo</menu-item>
          <menu-item>Bar</menu-item>
          <menu-item>Baz</menu-item>
        </menu-list>
        <section class="container">
          <p>Open context menu in here</p>
        </section>
      </context-menu>
    `,
};
