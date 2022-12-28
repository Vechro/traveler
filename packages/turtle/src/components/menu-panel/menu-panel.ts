import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./menu-panel.styles";

@customElement("menu-panel")
export class MenuPanel extends LitElement {
  static override styles = styles;

  override render = () => {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-panel": MenuPanel;
  }
}
