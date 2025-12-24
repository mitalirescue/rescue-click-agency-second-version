import React from 'react';

// A simple recursive Markdown parser/renderer to avoid external heavy deps like react-markdown if environment is restricted
// However, for best results in this demo, we'll simulate basic markdown features:
// - Code blocks
// - Bold/Italic
// - Links
// - Lists

const processText = (text: string) => {
  // Split by code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const content = part.slice(3, -3).replace(/^.*\n/, ''); // Remove first line (lang)
      const langMatch = part.match(/^```(\w+)/);
      const language = langMatch ? langMatch[1] : 'text';
      return (
        <div key={index} className="my-4 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
          <div className="bg-slate-800 px-4 py-1 text-xs text-slate-400 border-b border-slate-700 flex justify-between">
            <span>{language}</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-400">
            <code>{content}</code>
          </pre>
        </div>
      );
    }
    
    // Process inline formatting (simplified)
    return (
      <div key={index} className="whitespace-pre-wrap leading-relaxed">
        {part.split('\n').map((line, i) => (
          <p key={i} className="mb-1 min-h-[1em]">{parseInline(line)}</p>
        ))}
      </div>
    );
  });
};

const parseInline = (text: string): React.ReactNode[] => {
  // Handle bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-slate-200 font-bold">{part.slice(2, -2)}</strong>;
    }
    // Handle links [text](url) - Basic Regex
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const linkParts = [];
    let lastIndex = 0;
    let match;
    
    // If no bold, check for links
    while ((match = linkRegex.exec(part)) !== null) {
      if (match.index > lastIndex) {
        linkParts.push(part.substring(lastIndex, match.index));
      }
      linkParts.push(
        <a key={`${i}-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < part.length) {
      linkParts.push(part.substring(lastIndex));
    }
    
    return linkParts.length > 0 ? <span key={i}>{linkParts}</span> : <span key={i}>{part}</span>;
  });
};

export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return <div className="text-slate-300">{processText(content)}</div>;
};
