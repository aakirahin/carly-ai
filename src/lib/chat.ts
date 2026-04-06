import type { Message } from "../utils/type";

const apiKey = import.meta.env.VITE_API_KEY;

export const startConversation = async (prompt: string) => {
  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
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
  return result
}

export const getResponse = async (messages: Message[]) => {
    debugger
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "openrouter/free",
            "messages": messages
        })
    });

    const result = await response.json();
    return result
}