import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  FileCode,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { ModelProvider, FileItem } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  codeSnippet?: string;
}

interface AIChatViewProps {
  models: ModelProvider[];
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  activeFile: FileItem | null;
  onApplyCodeToFile: (code: string) => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  models,
  selectedModel,
  setSelectedModel,
  activeFile,
  onApplyCodeToFile,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello! I am your CodeSandBox AI pair programmer. I can refactor code, generate React components, write tests, or analyze server routes. What would you like to work on?',
      time: '09:20',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isSending) return;

    const userText = inputPrompt;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          model: selectedModel,
          context: activeFile ? `Active File: ${activeFile.path}\n\`\`\`\n${activeFile.content}\n\`\`\`` : '',
        }),
      });

      const data = await res.json();
      const assistantText = data.text || 'Processed your instruction and updated the code context.';

      // Extract code block if present
      let extractedCode: string | undefined = undefined;
      const codeBlockMatch = assistantText.match(/```(?:tsx|typescript|jsx|js)?\n([\s\S]*?)```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        extractedCode = codeBlockMatch[1];
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: assistantText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet: extractedCode,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 bg-[#0D0D0D] flex flex-col h-full font-mono select-none overflow-hidden">
      {/* Header */}
      <div className="h-8 bg-[#151515] border-b border-[#2A2A2A] px-3 flex items-center justify-between text-[11px] text-[#D1D1D1]">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold text-white">AI Pair Programmer</span>
          {activeFile && (
            <span className="bg-[#0D0D0D] border border-[#2A2A2A] text-[#888] text-[10px] px-1.5 py-0.2 rounded font-mono truncate max-w-[150px]">
              Context: {activeFile.name}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-[#666] font-mono">Engine:</span>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-[#0D0D0D] border border-[#2A2A2A] rounded px-2 py-0.5 text-[11px] text-blue-400 font-medium outline-none"
          >
            {models.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name} ({m.provider})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-[11px] select-text">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded p-3 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white border border-blue-400/30'
                  : 'bg-[#151515] border border-[#2A2A2A] text-[#D1D1D1]'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[10px] opacity-75">
                <span className="font-semibold flex items-center gap-1">
                  {msg.sender === 'assistant' ? (
                    <>
                      <Bot className="w-3 h-3 text-blue-400" />
                      CodeSandBox AI ({selectedModel})
                    </>
                  ) : (
                    'You'
                  )}
                </span>
                <span>{msg.time}</span>
              </div>

              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.codeSnippet && (
                <div className="mt-2 pt-2 border-t border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-blue-400 flex items-center gap-1 font-semibold">
                      <FileCode className="w-3 h-3" /> Output
                    </span>
                    <button
                      onClick={() => onApplyCodeToFile(msg.codeSnippet!)}
                      className="px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white font-mono rounded text-[10px] flex items-center gap-1 transition active:scale-[0.98]"
                    >
                      <Wand2 className="w-3 h-3" />
                      <span>Apply Code</span>
                    </button>
                  </div>
                  <pre className="bg-[#0D0D0D] p-2 rounded border border-[#2A2A2A] font-mono text-[10px] text-[#D1D1D1] overflow-x-auto">
                    {msg.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-[#151515] border border-[#2A2A2A] rounded p-2 text-[#888] flex items-center space-x-2 text-[11px]">
              <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />
              <span>AI is generating code response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-2 bg-[#151515] border-t border-[#2A2A2A] flex items-center space-x-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder={`Ask ${selectedModel} to write code, debug, or refactor...`}
          className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] rounded px-3 py-1.5 text-[11px] text-white placeholder-[#555] outline-none focus:border-blue-500/50"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isSending}
          className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50 transition active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
