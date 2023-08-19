export interface ContentChangeDetail {
  headerText?: string;
  contentText?: string;
  contentHtml?: string;
}

export class ContentChangeEvent extends CustomEvent<ContentChangeDetail> {
  constructor(detail: ContentChangeDetail) {
    super("content-change", { detail });
  }
}

declare global {
  interface HTMLElementEventMap {
    "content-change": ContentChangeEvent;
  }
}
