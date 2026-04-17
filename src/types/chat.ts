export type Message = {
  id: string
  role: "user" | "assistant"
  content: string | null
  reasoning?: string
}

export type Chat = {
  id: string
  title: string
  created: number
  favourite?: boolean
  messages: Message[]
}