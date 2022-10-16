import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import cross from "../../assets/icons/cross.svg?raw";
import { styles } from "./menu-item.styles";

@customElement("menu-item")
export class MenuItem extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  closeable = false;

  private handleClose = (event: PointerEvent) => {
    event.stopPropagation();
    this.dispatchEvent(new MouseEvent("close", event));
  };

  render() {
    return html`
      <span class="menu-item-main"><slot></slot></span>
      <span
        class=${classMap({
          "menu-item-close": this.closeable,
        })}
        part="close"
        @pointerup=${this.handleClose}
      >
        ${unsafeSVG(cross)}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-item": MenuItem;
  }
}
