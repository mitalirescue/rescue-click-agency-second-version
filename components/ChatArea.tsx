import React, { useRef, useEffect } from 'react';
import { Message, MessageRole, ModelType, Attachment } from '../types';
import { Icons } from './Icon';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
  currentModel: ModelType;
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
  onAttach: (files: FileList) => void;
  attachments: Attachment[];
  onRemoveAttachment: (index: number) => void;
  useSearch: boolean;
  setUseSearch: (val: boolean) => void;
  useThinking: boolean;
  setUseThinking: (val: boolean) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isThinking,
  currentModel,
  input,
  setInput,
  onSend,
  isLoading,
  onAttach,
  attachments,
  onRemoveAttachment,
  useSearch,
  setUseSearch,
  useThinking,
  setUseThinking
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4">
              <Icons.Sparkles className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-lg font-medium">How can I help you today?</p>
            <p className="text-sm">Try asking about code, analyzing images, or current events.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === MessageRole.USER 
                ? 'bg-indigo-600' 
                : 'bg-emerald-600'
            }`}>
              {msg.role === MessageRole.USER ? <Icons.User className="w-5 h-5 text-white" /> : <Icons.Bot className="w-5 h-5 text-white" />}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col max-w-[85%] md:max-w-[70%] space-y-2`}>
              <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${
                msg.role === MessageRole.USER
                  ? 'bg-indigo-600 text-white rounded-tr-sm'
                  : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-sm'
              }`}>
                {/* Images in message */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {msg.attachments.map((att, idx) => (
                      <div key={idx} className="relative group overflow-hidden rounded-lg border border-white/10">
                        <img 
                          src={`data:${att.mimeType};base64,${att.data}`} 
                          alt="Attached" 
                          className="max-h-64 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <MarkdownRenderer content={msg.text} />
                
                {/* Grounding / Search Sources */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/50">
                    <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                      <Icons.Search className="w-3 h-3" /> Sources
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingChunks.map((chunk, idx) => chunk.web ? (
                        <a 
                          key={idx}
                          href={chunk.web.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-slate-900/50 hover:bg-slate-900 rounded text-xs text-blue-300 truncate max-w-[200px] border border-slate-700 transition-colors"
                        >
                          {chunk.web.title}
                        </a>
                      ) : null)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
               <Icons.Bot className="w-5 h-5 text-white" />
             </div>
             <div className="flex items-center gap-2 px-5 py-4 bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-900 border-t border-slate-800 z-10">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
            {attachments.map((att, idx) => (
              <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-600 group flex-shrink-0">
                <img src={`data:${att.mimeType};base64,${att.data}`} alt="preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => onRemoveAttachment(idx)}
                  className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
                >
                  <Icons.Close className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto flex flex-col gap-3">
            {/* Tools Bar */}
            <div className="flex items-center gap-4 px-2">
                <button 
                  onClick={() => setUseSearch(!useSearch)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors ${
                    useSearch ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icons.Search className="w-3.5 h-3.5" /> Google Search
                </button>

                <button 
                  onClick={() => setUseThinking(!useThinking)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors ${
                    useThinking ? 'text-purple-400 bg-purple-400/10' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Enable thinking for complex reasoning (Gemini Pro)"
                >
                  <Icons.Thinking className="w-3.5 h-3.5" /> Deep Thinking
                </button>
            </div>

            <div className="relative flex items-end gap-2 bg-slate-800 p-2 rounded-2xl border border-slate-700 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-lg">
              <input 
                type="file" 
                multiple 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => e.target.files && onAttach(e.target.files)}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors"
                title="Attach Image"
              >
                <Icons.Attach className="w-5 h-5" />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Gemini..."
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none py-3 max-h-32 min-h-[48px] resize-none"
                rows={1}
                style={{ height: 'auto', minHeight: '24px' }}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                }}
              />
              
              <button 
                onClick={onSend}
                disabled={(!input.trim() && attachments.length === 0) || isLoading}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  (!input.trim() && attachments.length === 0) || isLoading
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'
                }`}
              >
                {isLoading ? <Icons.Refresh className="w-5 h-5 animate-spin" /> : <Icons.Send className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500">Gemini may display inaccurate info, including about people, so double-check its responses.</p>
            </div>
        </div>
      </div>
    </div>
  );
};
