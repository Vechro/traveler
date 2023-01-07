enum HeadingKind {
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
}

export type Heading = keyof typeof HeadingKind;

export type FormatCommand =
  | "bold"
  | "italic"
  | "underline"
  | "removeFormat"
  | "strikeThrough"
  | "formatBlock"
  | Heading;

const takeIfSelectionInTag = <T extends keyof HTMLElementTagNameMap>(tag: T): HTMLElementTagNameMap[T] | null => {
  const selection = document.getSelection();
  const ancestor = selection?.anchorNode?.parentElement;
  return tag.toUpperCase() === ancestor?.tagName ? (ancestor as HTMLElementTagNameMap[T]) : null;
};

const isHeading = (command: FormatCommand): command is Heading => command in HeadingKind;

export function applyFormat(format: "formatBlock", argument: `<${string}>`): void;
export function applyFormat(format: Heading): void;
export function applyFormat(format: "bold" | "italic" | "underline" | "removeFormat" | "strikeThrough"): void;
export function applyFormat(format: FormatCommand, argument?: string): void {
  if (isHeading(format)) {
    const ancestor = takeIfSelectionInTag(format);
    if (ancestor) {
      const selection = document.getSelection();
      if (!selection) return;
      const { anchorOffset, focusOffset } = selection;
      const anchorRange = selection.getRangeAt(0);
      const textNode = document.createTextNode(ancestor.innerText);
      ancestor.remove();
      anchorRange?.insertNode(textNode);
      selection?.setBaseAndExtent(textNode, anchorOffset, textNode, focusOffset);
    } else {
      applyFormat("formatBlock", `<${format}>`);
    }
  } else {
    document.execCommand(format, false, argument);
  }
}
