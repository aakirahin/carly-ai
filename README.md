# Carly AI

A lightweight chat UI built with React, TypeScript, and Vite.

`carly-ai` provides a clean, local-first chat experience with a persistent sidebar, prompt suggestions, and OpenRouter-backed responses.

Deployed site: https://carly-ai.netlify.app/

## Features

- Create new chats from custom prompts or quick suggestions.
- Continue existing conversations at `/chat/:chatId`.
- Persist chats in browser local storage.
- Search chats in the sidebar.
- Rename, favourite, and delete chats from a context menu.
- Responsive layout with mobile-aware sidebar behavior.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Shadcn
- OpenRouter Chat Completions API

## Project Structure

```text
src/
  components/      # UI components (sidebar, messages, prompt bar, Carly avatar)
  hooks/           # Reusable hooks (mobile detection, debounce)
  lib/             # API integration (OpenRouter chat calls)
  pages/           # Route pages (new chat, chat, 404)
  utils/           # localStorage utilities, shared types, helpers
```

## How Data Is Stored

Chats are stored in browser local storage and synchronized in the sidebar using custom and browser storage events. No backend database is required for chat history.
