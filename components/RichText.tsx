import { PortableText } from "@portabletext/react";
import type { RichText as RichTextValue } from "@/lib/content/types";
import { safeHref } from "@/lib/content/shared";

export default function RichText({ blocks }: { blocks: RichTextValue }) {
  const value = blocks.map((block) => ({
    _type: "block" as const,
    _key: block.key,
    style: block.style,
    listItem: block.list,
    level: block.level,
    children: block.spans.map((span) => ({
      _type: "span" as const,
      _key: span.key,
      text: span.text,
      marks: [
        ...span.marks.filter((mark) =>
          ["strong", "em", "underline"].includes(mark),
        ),
        ...(safeHref(span.href) ? [`link-${span.linkKey ?? span.key}`] : []),
      ],
    })),
    markDefs: [
      ...new Map(
        block.spans.flatMap((span) => {
          const href = safeHref(span.href);
          const key = `link-${span.linkKey ?? span.key}`;
          return href
            ? [[key, { _key: key, _type: "link", href }] as const]
            : [];
        }),
      ).values(),
    ],
  }));
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p>{children}</p>,
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc ml-5">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="list-decimal ml-5">{children}</ol>
          ),
        },
        marks: {
          link: ({ value, children }) => (
            <a href={safeHref(value?.href)}>{children}</a>
          ),
        },
      }}
    />
  );
}
