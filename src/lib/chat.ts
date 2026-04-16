import type { Message } from "../utils/type";

export const startConversation = async (prompt: string) => {
  let response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "openrouter/free",
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ],
      "reasoning": {"enabled": true}
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'Failed to fetch chatbot response.');

  return result
}

export const getResponse = async (messages: Message[]) => {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "openrouter/free",
            "messages": messages
        })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? 'Failed to fetch chatbot response.');

    return result
}