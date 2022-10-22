import { StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./menu-panel";
import "../menu-list";
import "../menu-item";
import { rangeTo } from "../../extension";
export default {
  component: "menu-panel",
};

const menuItems = rangeTo(20).map(
  (x) =>
    html`
      <menu-item .closeable=${true}>Item #${x}</menu-item>
    `
);

export const Default: StoryObj = {
  render: () => html`
    <style>
      .container {
        margin: 0;
        width: 300px;
        height: 200px;
      }
      menu-list {
        max-height: 12rem;
      }
    </style>
    <section class="container">
      <menu-panel>
        <div slot="header">Hello</div>
        <div slot="footer">Goodbye</div>
        <menu-list>${menuItems}</menu-list>
      </menu-panel>
    </section>
  `,
};

export const NoFooter: StoryObj = {
  render: () => html`
    <style>
      .container {
        margin: 0;
        width: 300px;
      }
      menu-list {
        max-height: 12rem;
      }
    </style>
    <section class="container">
      <menu-panel>
        <div slot="header">Hello</div>
        <menu-list>${menuItems}</menu-list>
      </menu-panel>
    </section>
  `,
};
