import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styles } from "./context-menu.styles";

@customElement("context-menu")
export class ContextMenu extends LitElement {
  static override styles = styles;

  @state()
  open = false;

  @state()
  private location: [x: number, y: number] = [0, 0];

  private handleContextMenu = (event: MouseEvent) => {
    if (event.shiftKey) return;
    event.preventDefault();
    event.stopPropagation();
    this.open = true;
    this.location = [event.pageX, event.pageY];
    this.dispatchEvent(new MouseEvent("open", event));
  };

  private handleDismiss = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof KeyboardEvent && event.key !== "Escape") {
      return;
    }
    this.open = false;
    this.dispatchEvent(new UIEvent("close", event));
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener("pointerdown", this.handleDismiss);
    window.addEventListener("keydown", this.handleDismiss);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("pointerdown", this.handleDismiss);
    window.removeEventListener("keydown", this.handleDismiss);
  }

  override render() {
    return html`
      <style>
        ::slotted([slot="context-menu"]) {
          left: ${this.location[0]}px;
          top: ${this.location[1]}px;
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
