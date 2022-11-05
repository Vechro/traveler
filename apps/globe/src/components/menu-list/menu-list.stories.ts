import { Story } from "@storybook/web-components";
import { html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import cross from "../../assets/icons/cross.svg?raw";
import edit from "../../assets/icons/edit.svg?raw";
import "../menu-item";
import "./menu-list";
import { MenuList } from "./menu-list";

export default {
  component: "menu-list",
};

export const Default: Story<MenuList> = {
  render: () =>
    html`
    <style>
      .container {
        margin: 0;
        width: 300px;
        height: 200px;
      }
    </style>
    <section class="container">
      <menu-list>
        <menu-item>Item #1</menu-item>
        <menu-item>Item #2</menu-item>
        <menu-item>Item #3</menu-item>
      </menu-list>
    </section>
  `,
};

export const UtilizingButtonBar: Story<MenuList> = {
  render: () =>
    html`
    <style>
      .container {
        margin: 0;
        width: 300px;
        height: 200px;
      }
      .bar-item {
        width: 1rem;
        padding: 0.5rem;
        border-radius: var(--border-radius);
      }
      .bar-item:hover {
        background-color: var(--background-color-hover);
      }
      .bar-item svg {
        transition: var(--color-transition);
        color: transparent;
      }
      menu-item:hover svg {
        color: currentColor;
      }
    </style>
    <section class="container">
      <menu-list>
        <menu-item .closeable=${true}>
          <span>Item #1</span>
          <div slot="interaction-bar">
            <span class="bar-item">${unsafeSVG(edit)}</span>
            <span class="bar-item">${unsafeSVG(cross)}</span>
          </div>
        </menu-item>
        <menu-item .closeable=${true}><span>Item #2</span></menu-item>
        <menu-item .closeable=${true}><span>Item #3</span></menu-item>
      </menu-list>
    </section>
  `,
};
