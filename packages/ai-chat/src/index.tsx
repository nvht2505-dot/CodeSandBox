import { useState, useRef, useEffect } from "react";
import { sendMessage, reviewCode, generateCodeSuggestion, type Message } from "../../apps/ide/src/services/openai";
import "./style.css";

interface AIChatProps {
  currentCode?: string;
  currentFileName?: string;
  onCodeInsert?: (code: string) => void;
}

type ChatMode = "chat" | "review" | "generate";

export default function AIChat({ currentCode = "", currentFileName = "", onCodeInsert }: AIChatProps) {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("openai_api_key") || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Chào bạn! Tôi là AI Code Assistant. Bạn có thể:\n• Chat về code\n• Review code hiện tại\n• Generate code từ prompt",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [reviewResult, setReviewResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      alert("Vui lòng nhập API Key");
      return;
    }
    localStorage.setItem("openai_api_key", apiKey);
    setShowApiKeyInput(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let response = "";

      if (mode === "chat") {
        response = await sendMessage(
          apiKey,
          messages.map((m) => ({ role: m.role, content: m.content })),
          userMessage
        );
      } else if (mode === "review") {
        if (!currentCode) {
          response = "❌ Không có code để review. Vui lòng viết code trước!";
        } else {
          const result = await reviewCode(apiKey, {
            code: currentCode,
            language: getLanguageFromFileName(currentFileName),
            fileName: currentFileName,
          });
          setReviewResult(result);
          response = formatReviewResponse(result);
        }
      } else if (mode === "generate") {
        response = await generateCodeSuggestion(apiKey, userMessage, getLanguageFromFileName(currentFileName));
        response = `\`\`\`javascript\n${response}\n\`\`\``;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `❌ Lỗi: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 Chat được reset. Bắt đầu lại!",
        timestamp: Date.now(),
      },
    ]);
    setReviewResult(null);
  };

  if (showApiKeyInput) {
    return (
      <div className="ai-chat-container">
        <div className="api-key-setup">
          <h3>🔑 Setup OpenAI API Key</h3>
          <p>Nhập OpenAI API Key của bạn để sử dụng AI features</p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="api-key-input"
          />
          <button onClick={handleSaveApiKey} className="btn-primary">
            Lưu & Tiếp tục
          </button>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "12px" }}>
            🔒 API Key được lưu trên localStorage máy bạn, không gửi cho server nào
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === "chat" ? "active" : ""}`}
            onClick={() => {
              setMode("chat");
              setReviewResult(null);
            }}
          >
            💬 Chat
          </button>
          <button
            className={`mode-btn ${mode === "review" ? "active" : ""}`}
            onClick={() => {
              setMode("review");
              setReviewResult(null);
            }}
          >
            🔍 Review
          </button>
          <button
            className={`mode-btn ${mode === "generate" ? "active" : ""}`}
            onClick={() => {
              setMode("generate");
              setReviewResult(null);
            }}
          >
            ✨ Generate
          </button>
        </div>
        <button className="btn-small" onClick={handleClearChat}>
          🗑️
        </button>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="message-avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
            <div className="message-content">
              {msg.content.includes("```") ? (
                <pre>{msg.content}</pre>
              ) : (
                <p>{msg.content.split("\n").map((line, i) => <div key={i}>{line}</div>)}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {reviewResult && mode === "review" && (
        <div className="review-panel">
          <div className="review-section">
            <h4>📋 Issues ({reviewResult.issues?.length || 0})</h4>
            {reviewResult.issues?.map((issue: any, i: number) => (
              <div key={i} className={`issue-item severity-${issue.severity}`}>
                <span className="severity-badge">{issue.severity.toUpperCase()}</span>
                <span>{issue.message}</span>
                {issue.suggestion && <p className="suggestion">💡 {issue.suggestion}</p>}
              </div>
            ))}
          </div>
          {reviewResult.improvements?.length > 0 && (
            <div className="review-section">
              <h4>⚡ Improvements</h4>
              <ul>
                {reviewResult.improvements.map((imp: string, i: number) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="ai-chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "chat"
              ? "Hỏi gì về code..."
              : mode === "review"
                ? "Ấn Send để review code hiện tại"
                : "Mô tả code bạn muốn..."
          }
          disabled={loading}
          className="ai-chat-input"
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn-send">
          {loading ? "⏳" : "📤"}
        </button>
      </form>

      <div className="ai-chat-footer">
        <button className="btn-small" onClick={() => setShowApiKeyInput(true)}>
          🔑 Change API Key
        </button>
      </div>
    </div>
  );
}

function getLanguageFromFileName(fileName: string): string {
  if (fileName.includes(".tsx") || fileName.includes(".ts")) return "typescript";
  if (fileName.includes(".jsx") || fileName.includes(".js")) return "javascript";
  if (fileName.includes(".py")) return "python";
  if (fileName.includes(".java")) return "java";
  if (fileName.includes(".go")) return "go";
  if (fileName.includes(".rs")) return "rust";
  return "javascript";
}

function formatReviewResponse(result: any): string {
  let response = `## 📊 Code Review\n\n`;
  response += `**Overall Review:** ${result.review}\n\n`;

  if (result.issues && result.issues.length > 0) {
    response += `**Issues Found:** ${result.issues.length}\n`;
    result.issues.forEach((issue: any, i: number) => {
      response += `\n${i + 1}. [${issue.severity.toUpperCase()}] ${issue.message}`;
      if (issue.suggestion) response += `\n   💡 Gợi ý: ${issue.suggestion}`;
    });
  }

  if (result.improvements && result.improvements.length > 0) {
    response += `\n\n**Improvements:**\n`;
    result.improvements.forEach((imp: string) => {
      response += `- ${imp}\n`;
    });
  }

  return response;
}
