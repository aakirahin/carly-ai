export type NavItem = {
  id: string
  name: string
  url: string
  favourite: boolean
}

export type EditItem = {
  chatId: string
  isEditing: boolean
  newTitle: string
}