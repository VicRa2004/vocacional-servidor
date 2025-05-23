// components/MarkdownRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 bg-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Bloques de código
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            
            if (!inline && match) {
              return (
                <div className="my-4">
                  <div className="bg-gray-100 p-2 rounded-t-lg border border-gray-300 text-sm text-gray-600">
                    {match[1]}
                  </div>
                  <pre 
                    className={`bg-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border border-gray-300 border-t-0`}
                    {...props}
                  >
                    {children}
                  </pre>
                </div>
              );
            }
            
            return (
              <code
                className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Encabezados
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 pb-2 border-b border-gray-300" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold mt-7 mb-3 pb-2 border-b border-gray-300" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium mt-6 mb-3" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-medium mt-5 mb-2" {...props} />
          ),

          // Párrafos
          p: ({ node, ...props }) => (
            <p className="text-gray-800 leading-relaxed mb-4" {...props} />
          ),

          // Listas
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-5" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-1 pl-2 text-gray-800" {...props} />
          ),

          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic my-4 py-1 bg-gray-50"
              {...props}
            />
          ),

          // Enlaces
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline break-words"
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),

          // Imágenes
          img: ({ node, ...props }) => (
            <img
              className="my-4 mx-auto rounded-lg max-w-full h-auto"
              {...props}
              alt={props.alt || "Markdown image"}
            />
          ),

          // Tablas
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table 
                className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden" 
                {...props} 
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-gray-50" {...props} />
          ),

          // Énfasis
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic" {...props} />
          ),

          // Líneas horizontales
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-300" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};