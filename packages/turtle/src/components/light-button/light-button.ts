import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./light-button.styles";

@customElement("light-button")
export class LightButton extends LitElement {
  static override styles = styles;

  override render() {
    return html`
      <button part="button" type="button"><slot></slot></button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "light-button": LightButton;
  }
}
