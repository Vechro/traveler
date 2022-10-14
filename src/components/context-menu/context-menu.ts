import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import "../../extension";
import { styles } from "./context-menu.styles";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  open = false;

  @query("slot[name='menu-items']", true)
  containerSlot!: HTMLSlotElement;

  private location?: [number, number];

  private handleContextMenu = (event: MouseEvent) => {
    this.open = !this.open;
    this.location = event.pagePosition;
    event.preventDefault();
  };

  private handleDismiss = (event: MouseEvent | KeyboardEvent) => {
    // It does work
    if (event instanceof KeyboardEvent && event.key !== "Escape") {
      return;
    }
    this.open = false;
    event.preventDefault();
  };

  connectedCallback() {
    super.connectedCallback();
    addEventListener("pointerup", this.handleDismiss);
    addEventListener("keydown", this.handleDismiss);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    removeEventListener("pointerup", this.handleDismiss);
    removeEventListener("keydown", this.handleDismiss);
  }

  render() {
    return html`
      <style>
        ::slotted([slot="menu-items"]) {
          left: ${this.location?.[0] ?? 0}px;
          top: ${this.location?.[1] ?? 0}px;
        }
      </style>
      ${this.open
        ? html`
            <slot name="menu-items"></slot>
          `
        : nothing}
      <slot id="container" @contextmenu=${this.handleContextMenu}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
