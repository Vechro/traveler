import { action } from "@storybook/addon-actions";
import type { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import cross from "../../assets/icons/cross.svg?raw";
import edit from "../../assets/icons/edit.svg?raw";
import pin from "../../assets/icons/pin.svg?raw";
import "./light-button";
import type { LightButton } from "./light-button";

export default {
  component: "light-button",
};

export const Default: StoryObj<LightButton> = {
  render: () =>
    html`
      <light-button title="Close" @click=${action("click")}>${unsafeSVG(cross)}</light-button>
      <light-button title="Edit" @click=${action("click")}>${unsafeSVG(edit)}</light-button>
      <light-button title="Pin" @click=${action("click")}>${unsafeSVG(pin)}</light-button>
    `,
};
