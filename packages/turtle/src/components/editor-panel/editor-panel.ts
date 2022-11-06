import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { applyFormat } from "../../utilities";
import { styles } from "./editor-panel.styles";

@customElement("editor-panel")
export class EditorPanel extends LitElement {
  static styles = styles;

  @property({ type: String })
  content = "";

  @query(".content")
  contentElement!: HTMLElement;

  handleContentInput = () => {
    this.dispatchEvent(
      new CustomEvent("content-change", {
        detail: {
          text: this.contentElement.innerText,
          rawHtml: this.contentElement.innerHTML,
        },
      }),
    );
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "b":
          applyFormat("bold");
          break;
        case "h":
          applyFormat("h3");
          break;
        case "i":
          applyFormat("italic");
          break;
        case "q":
          applyFormat("removeFormat");
          break;
        case "u":
          applyFormat("underline");
          break;
        default:
          return;
      }
    } else {
      event.stopImmediatePropagation();
      return;
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
