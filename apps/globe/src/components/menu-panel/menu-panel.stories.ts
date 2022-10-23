import { Story } from "@storybook/web-components";
import { html } from "lit";
import { rangeTo } from "../../utilities";
import "../menu-item";
import "../menu-list";
import "./menu-panel";
import { MenuPanel } from "./menu-panel";

export default {
  component: "menu-panel",
};

const menuItems = rangeTo(20).map(
  (x) =>
    html`
      <menu-item .closeable=${true}>Item #${x}</menu-item>
    `
);

export const Default: Story<MenuPanel> = {
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

export const NoFooter: Story<MenuPanel> = {
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
