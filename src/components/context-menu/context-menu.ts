import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import "../../math";
import { styles } from "./context-menu.styles";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  open = false;

  @query("slot")
  defaultSlot!: HTMLSlotElement;

  private location?: [number, number];

  private handleContextMenu = (event: MouseEvent) => {
    this.open = !this.open;
    this.location = event.pagePosition;
    event.preventDefault();
  };

  private handleDismiss = (event: MouseEvent | KeyboardEvent) => {
    // It does work
    if (event.composedPath().includes(this.defaultSlot)) {
      return;
    }
    if (event instanceof KeyboardEvent && event.key !== "Escape") {
      return;
    }
    this.open = false;
    event.preventDefault();
  };

  connectedCallback() {
    super.connectedCallback();
    addEventListener("contextmenu", this.handleContextMenu);
    addEventListener("pointerdown", this.handleDismiss);
    addEventListener("keydown", this.handleDismiss);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    removeEventListener("contextmenu", this.handleContextMenu);
    removeEventListener("pointerdown", this.handleDismiss);
    removeEventListener("keydown", this.handleDismiss);
  }

  render() {
    return html` <style>
        :host {
          left: ${this.location?.[0] ?? 0}px;
          top: ${this.location?.[1] ?? 0}px;
        }
      </style>
      ${this.open ? html`<slot></slot>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "context-menu": ContextMenu;
  }
}
