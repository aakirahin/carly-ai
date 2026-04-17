import type { Message } from "../types/chat";
import type { Response } from "../types/response";

export const getResponse = async (
  chat: boolean,
  messages: Message[] | string
): Promise<Response> => {
  let response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "openrouter/free",
      "messages": chat ? 
        messages : 
        [
          {
            "role": "user",
            "content": messages
          }
        ],
      "reasoning": { "enabled": true }
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'Failed to fetch chatbot response.');

  console.log(result)
  return result
}