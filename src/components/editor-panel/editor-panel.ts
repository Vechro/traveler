import { html, LitElement } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { styles } from "./editor-panel.styles";

@customElement("editor-panel")
export class EditorPanel extends LitElement {
  static styles = styles;

  @property({ type: String })
  content = "";

  @queryAssignedElements({ slot: "content" })
  contentElements!: HTMLElement[];

  handleContentInput = () => {
    const content = this.contentElements[0];
    if (!content) return;
    this.dispatchEvent(
      new CustomEvent("content-change", {
        detail: {
          text: content.innerText,
        },
      })
    );
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "b":
          document.execCommand("bold");
          break;
        case "i":
          document.execCommand("italic");
          break;
        case "q":
          document.execCommand("removeFormat");
          break;
        case "u":
          document.execCommand("underline");
          break;
        default:
          return;
      }
    }
    event.preventDefault();
  };

  render() {
    return html`
      <slot name="header"></slot>
      <section
        class="content"
        part="content"
        contenteditable
        @input=${this.handleContentInput}
        @keydown=${this.handleKeyDown}
      >
        ${this.content}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "editor-panel": EditorPanel;
  }
}
