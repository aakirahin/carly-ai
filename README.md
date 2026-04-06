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

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create or update `.env.local` in the project root:

```env
VITE_API_KEY=your_openrouter_api_key_here
```

3. Save the file.

4. Start the development server:

```bash
npm run dev
```

5. Open the app at the local URL shown in the terminal (typically `http://localhost:5173`).

## Environment Variables

- `VITE_API_KEY`: Required. Used in `src/lib/chat.ts` to authorize requests to `https://openrouter.ai/api/v1/chat/completions`.

## Available Scripts

- `npm run dev`: Start Vite development server.
- `npm run build`: Type-check and build production assets.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

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

## Notes

- The app currently uses the `openrouter/free` model identifier.
- Keep your API key private and do not commit `.env` files.
