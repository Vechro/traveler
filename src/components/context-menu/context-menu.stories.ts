import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";

import "./context-menu";
import type { ContextMenu } from "./context-menu";

export default {
  title: "Context Menu",
  component: "context-menu",
} as Meta;

export const Template: Story<ContextMenu> = (args) =>
  html`<context-menu></context-menu>`;
