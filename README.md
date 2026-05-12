 Carly AI

**[Live Demo](https://carly-ai.netlify.app/)**

A local-first AI chat interface with an animated mascot, built with React, TypeScript, and Vite. Conversations are persisted in `localStorage` with real-time cross-tab synchronisation, and the app connects to OpenRouter's LLM API with chain-of-thought reasoning support.

## Technical Highlights

**Event-driven state synchronisation** — Chat state is managed through a dual-event pattern: a custom `STORAGE_UPDATED_EVENT` dispatches within the same tab, while the native `storage` event handles cross-tab updates. This keeps the sidebar in sync without a backend or global state library.

**Optimistic UI update on continuation** — When continuing an existing chat, the user's message is immediately written to `localStorage` and rendered before the API response resolves. Starting a new chat (`startChat`) is not optimistic — it awaits the full response before storing the chat and navigating, since there is no existing conversation to render into.

**Eye-tracking animation** — The Carly mascot's eyes follow the cursor on desktop. On mobile, the eyes animate autonomously with randomised intervals to simulate natural blinking.

**Reasoning token support** — The OpenRouter integration requests chain-of-thought reasoning (`{ "enabled": true }`), and the response types store `reasoning` and `reasoning_details` arrays alongside message content, supporting future display of step-by-step model reasoning.

**Full conversation history** — Each chat stores its complete message array; `continueChat` passes the full history to the API on every turn, preserving context across a session.

## Architecture

```
src/
  components/      # Sidebar, message bubbles, prompt bar, Carly avatar/eyes
  hooks/
    useGetChats      # Scans localStorage by UUID key pattern, syncs on storage events
    useSendMessage   # Handles startChat (new UUID, store, navigate) and continueChat (append + API)
    useEyeTracking   # Cursor tracking + mobile autonomous animation
    use-mobile       # Media query listener + debounce utility
  lib/
    chat.ts          # OpenRouter API client (getResponse)
  pages/             # NewChat (landing), Chat (active conversation), NotFound
  utils/
    localStorage.ts  # Wrapped get/set/remove with custom event dispatch
```

**Data flow:**
```
User input
  → useSendMessage
  → localStorage.setItem + notifyStorageUpdated()
  → useGetChats listener re-fetches sidebar
  → navigate to /chat/:id
```

## Tech Stack

- **React 19** + TypeScript
- **Vite** — build tooling
- **React Router** — client-side routing
- **Tailwind CSS** + **shadcn/ui** — styling and components
- **OpenRouter API** — LLM backend (chat completions with reasoning)

## Getting Started

```bash
npm install
```

Create `.env.local`:

```env
API_KEY=your_openrouter_api_key_here
```

```bash
npm run dev
# → http://localhost:5173
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `API_KEY` | Yes | OpenRouter API key, used in `src/lib/chat.ts` |

## Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Type-check + build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Data Persistence

All chats are stored in `localStorage`, keyed by UUID. There is no backend — the app is fully client-side. `localStorage` keys are distinguished from other entries using a UUID regex pattern in `useGetChats`.
