import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { applyFormat } from "../../utilities";
import { sanitizeHtml } from "../../utilities/sanitizeHtml";
import { ContentChangeEvent } from "./ContentChangeEvent";
import { styles } from "./editor-panel.styles";

@customElement("editor-panel")
export class EditorPanel extends LitElement {
  static override styles = styles;

  @property({ type: String })
  header = "";

  @property({ type: String })
  content = "";

  @query(".header")
  headerElement!: HTMLInputElement;

  @query(".content")
  contentElement!: HTMLElement;

  private handleTitleInput = () => {
    this.dispatchEvent(
      new ContentChangeEvent({
        headerText: this.headerElement.value,
      })
    );
  };

  private handleContentInput = () => {
    // TODO: debounce this
    this.dispatchEvent(
      new ContentChangeEvent({
        contentText: this.contentElement.innerText,
        contentHtml: sanitizeHtml(this.contentElement.innerHTML),
      })
    );
  };

  private handleTitleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
  };

  private handleContentKeyDown = (event: KeyboardEvent) => {
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
      event.stopPropagation();
      return;
    }
    event.preventDefault();
  };

  override render() {
    return html`
      <input
        class="header"
        part="header"
        maxlength="32"
        value=${this.header}
        @change=${this.handleTitleInput}
        @keydown=${this.handleTitleKeyDown}
      />
      <section
        class="content"
        part="content"
        contenteditable
        @input=${this.handleContentInput}
        @keydown=${this.handleContentKeyDown}
      >
        ${unsafeHTML(sanitizeHtml(this.content))}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "editor-panel": EditorPanel;
  }
}
