import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";

import "./context-menu";
import type { ContextMenu } from "./context-menu";

export default {
  title: "Context Menu",
  component: "context-menu",
} as Meta;

export const Template: Story<ContextMenu> = (args) =>
  html` <style>
      .container {
        width: 300px;
        height: 200px;
        background: #eee;
      }
    </style>
    <section class="container">
      <p>Open context menu here</p>
      <context-menu>
        <div>
          Content
        </div>
      </context-menu>
    </section>`;
