export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface CodeReviewRequest {
  code: string;
  language: string;
  fileName?: string;
}

export interface CodeReviewResponse {
  review: string;
  issues: Array<{
    line?: number;
    severity: "error" | "warning" | "info";
    message: string;
    suggestion?: string;
  }>;
  improvements: string[];
}

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function sendMessage(
  apiKey: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  userMessage: string,
  model: string = "gpt-4-turbo-preview"
): Promise<string> {
  if (!apiKey) {
    throw new Error("OpenAI API Key không được cấu hình");
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [...messages, { role: "user", content: userMessage }],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API error");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function reviewCode(
  apiKey: string,
  codeReview: CodeReviewRequest
): Promise<CodeReviewResponse> {
  const prompt = `
Vui lòng review code ${codeReview.language} sau đây (file: ${codeReview.fileName || "unknown"}):

\`\`\`${codeReview.language}
${codeReview.code}
\`\`\`

Hãy cung cấp:
1. **Review tổng quan**: Nhận xét chung về code
2. **Vấn đề phát hiện**: Danh sách các vấn đề (lỗi, cảnh báo, info)
3. **Gợi ý cải thiện**: Danh sách cải thiện về performance, readability, best practices

Trả về dưới dạng JSON:
{
  "review": "Review tổng quan",
  "issues": [
    {"severity": "error|warning|info", "message": "...", "suggestion": "..."}
  ],
  "improvements": ["...", "..."]
}
`;

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "Bạn là một code reviewer chuyên nghiệp. Hãy review code và trả về JSON response.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API error");
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Parse JSON từ response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      review: content,
      issues: [],
      improvements: [],
    };
  }

  return JSON.parse(jsonMatch[0]);
}

export async function generateCodeSuggestion(
  apiKey: string,
  prompt: string,
  language: string = "javascript"
): Promise<string> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `Bạn là một expert code generator. Tạo code ${language} chất lượng cao. Chỉ trả về code, không có giải thích.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API error");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
