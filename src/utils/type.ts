export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  reasoning?: string
}

export type Chat = {
  id: string
  title: string
  created: Date
  favourite?: boolean
  messages: Message[]
}