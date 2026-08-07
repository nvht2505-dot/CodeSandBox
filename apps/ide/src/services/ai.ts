export async function askAI(prompt: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return await res.json();
}
