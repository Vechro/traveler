import { StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import "./editor-panel";
export default {
  component: "editor-panel",
};

export const Default: StoryObj = {
  render: () => html`
    <style>
      .container {
        margin: 0 auto;
        max-width: 640px;
      }
    </style>
    <section class="container">
      <editor-panel>
        <h3 slot="header" contenteditable>This is the title</h3>
        <section slot="content" contenteditable>
          ...and this is the content
        </section>
      </editor-panel>
    </section>
  `,
};
