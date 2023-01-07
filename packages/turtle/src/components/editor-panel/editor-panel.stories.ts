import { action } from "@storybook/addon-actions";
import type { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./editor-panel";
import type { EditorPanel } from "./editor-panel";

export default {
  component: "editor-panel",
};

export const Default: StoryObj<EditorPanel> = {
  render: () =>
    html`
      <style>
        .container {
          margin: 0 auto;
          max-width: 640px;
        }
      </style>
      <section class="container">
        <editor-panel
          .header=${"This is the title"}
          .content=${"...and this is the <b>content</b>"}
          @content-change=${(event: CustomEvent) => action("content-change")(event.detail)}
          @close=${action("close")}
        ></editor-panel>
      </section>
    `,
};
