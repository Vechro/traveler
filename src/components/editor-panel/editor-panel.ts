import { html, LitElement } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import { styles } from "./editor-panel.styles";

@customElement("editor-panel")
export class EditorPanel extends LitElement {
  static styles = styles;

  @queryAssignedElements({ slot: "header" })
  headerElements!: HTMLElement[];

  @queryAssignedElements({ slot: "content" })
  contentElements!: HTMLElement[];

  handleTitleInput = () => {
    const header = this.headerElements[0];
    if (!header) return;
    this.dispatchEvent(
      new CustomEvent("title-change", {
        detail: {
          text: header.innerText,
        },
      })
    );
  };

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
      <slot name="header" @input=${this.handleTitleInput}></slot>
      <section class="content" part="content">
        <slot name="content" @input=${this.handleTitleInput}></slot>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "editor-panel": EditorPanel;
  }
}
