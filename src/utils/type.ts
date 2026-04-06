export type Message = {
  role: "user" | "assistant"
  content: string
  reasoning?: string
}

export type Chat = {
  openrouter_id: string
  title: string
  created: Date
  messages: Message[]
}