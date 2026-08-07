import { useState } from "react";

export default function AIChat() {
  const [messages] = useState([
    {
      role: "assistant",
      content: "Welcome to CodeSandBox AI"
    }
  ]);

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{flex:1,padding:16,overflow:"auto"}}>
        {messages.map((m,i)=>(
          <div key={i}>
            <strong>{m.role}</strong>
            <div>{m.content}</div>
          </div>
        ))}
      </div>

      <input
        placeholder="Ask AI..."
        style={{
          padding:12,
          border:0,
          outline:"none"
        }}
      />
    </div>
  );
}
