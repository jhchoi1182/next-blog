"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <ReactMarkdown
      className="prose max-w-none dark:text-slate-100"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter {...props} style={dark} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image className="w-2/3 object-cover" src={image.src || ""} alt={image.alt || ""} width={500} height={350} />
        ),
        h2: ({ children }) => <h2 className="dark:text-slate-100">{children}</h2>,
        a: ({ children }) => <a className="text-river">{children}</a>,
        strong: ({ children }) => <strong className="font-bold dark:text-slate-100">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
