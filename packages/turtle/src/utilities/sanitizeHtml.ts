import DOMPurify from "dompurify";

export const sanitizeHtml = (source: string | Node) =>
  DOMPurify.sanitize(source, {
    FORBID_ATTR: ["style"],
    FORBID_TAGS: ["script", "style"],
    USE_PROFILES: {
      html: true,
    },
  });
