import { Story } from "@storybook/web-components";
import { html } from "lit";
import "./editor-panel";
import { EditorPanel } from "./editor-panel";

export default {
  component: "editor-panel",
};

export const Default: Story<EditorPanel> = {
  render: () => html`
    <style>
      .container {
        margin: 0 auto;
        max-width: 640px;
      }
    </style>
    <section class="container">
      <editor-panel
        .content=${"...and this is the content"}
        @content-change=${console.log}
      >
        <input slot="header" maxlength="32" value="This is the title" />
      </editor-panel>
    </section>
  `,
};
