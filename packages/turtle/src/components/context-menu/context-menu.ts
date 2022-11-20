import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../extension";
import { styles } from "./context-menu.styles";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  open = false;

  private location?: [number, number];

  private handleContextMenu = (event: MouseEvent) => {
    if (event.shiftKey) return;
    event.preventDefault();
    event.stopPropagation();
    this.open = true;
    this.location = event.pagePosition;
    this.dispatchEvent(new MouseEvent("open", event));
  };

  private handleDismiss = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent && event.key !== "Escape") {
      return;
    }
    this.open = false;
    this.dispatchEvent(new UIEvent("close", event));
  };

  connectedCallback() {
    super.connectedCallback();
    addEventListener("pointerdown", this.handleDismiss);
    addEventListener("keydown", this.handleDismiss);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    removeEventListener("pointerdown", this.handleDismiss);
    removeEventListener("keydown", this.handleDismiss);
  }

  render() {
    return html`
      <style>
        ::slotted([slot="context-menu"]) {
          left: ${this.location?.[0] ?? 0}px;
          top: ${this.location?.[1] ?? 0}px;
        }
      </style>
      <slot ?hidden=${!this.open} name="context-menu"></slot>
      <slot id="container" @contextmenu=${this.handleContextMenu}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
