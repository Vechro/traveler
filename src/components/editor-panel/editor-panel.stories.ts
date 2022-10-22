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
      <editor-panel .content=${"...and this is the content"}>
        <input slot="header" maxlength="32" value="This is the title" />
      </editor-panel>
    </section>
  `,
};
