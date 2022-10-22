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

  render() {
    return html`
      <slot name="header"></slot>
      <section
        class="content"
        part="content"
        contenteditable
        @input=${this.handleContentInput}
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
