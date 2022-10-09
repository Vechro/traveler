import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";

import "./context-menu";
import type { ContextMenu } from "./context-menu";

export default {
  title: "Context Menu",
  component: "context-menu",
} as Meta;

export const Template: Story<ContextMenu> = () =>
  html` <style>
      .container {
        width: 300px;
        height: 200px;
        border: 1px solid black;
        padding-inline: .5rem;
      }
    </style>
    <section class="container">
      <p>Open context menu in here</p>
      <context-menu>
        <button>Foo</button>
        <button>Bar</button>
        <button>Baz</button>
      </context-menu>
    </section>`;
