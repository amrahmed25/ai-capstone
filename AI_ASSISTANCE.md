# How AI Assisted Development

This project was built using **Cursor** as an AI development assistant, following the prompt-driven workflow demonstrated in the mentor session (*React Prompted Development with AI*).

## Role of AI

AI was used as a **pair programmer**, not as a black box. Each feature was requested through a focused, single-responsibility prompt. The assistant generated scaffolding, boilerplate, and initial implementations; I reviewed, tested, and refined the output before moving to the next step.

### What AI did well

1. **Scaffolding** — Generated the Vite + React + TypeScript project structure, MVVM folder layout, and service layer files quickly.
2. **Repetitive patterns** — Produced consistent view-model hooks (`useState`, `useEffect`, try/catch/finally) across Home, Favorites, and Auth screens.
3. **Type definitions** — Created `Movie` and `OMDbSearchResponse` types aligned with the OMDB API shape.
4. **Firebase integration** — Wrote initial Realtime Database paths and auth service functions from specification prompts.
5. **Tailwind styling** — Applied a cohesive dark theme to Header, MovieCard, and auth forms in one pass.

### How I guided AI

- **One task per prompt** — e.g. "create empty MVVM structure" before "implement home model", mirroring the mentor session.
- **Explicit constraints** — Each prompt included "do not use React hooks in the model" or "do not call fetch from the view" to enforce separation of concerns.
- **Incremental verification** — Ran `npm run dev` and tested search, favorites, and auth after each major step.
- **Error-driven fixes** — Pasted runtime errors (missing router package, 401 from OMDB, favorite button not wired) back into Cursor for targeted fixes.

## Workflow summary

```
Prompt → AI generates code → Manual review → Test in browser → Refine → Next prompt
```

This mirrors the mentor's approach: prompt for structure first, then behavior, then styling, then Firebase — never everything at once.

## Manual improvements after AI review

See [MANUAL_IMPROVEMENTS.md](./MANUAL_IMPROVEMENTS.md) for specific examples of corrections and refactoring performed after reviewing AI-generated code.

## Submission checklist

| Requirement | Location |
| --- | --- |
| Completed application | `src/` |
| Prompts used | [PROMPTS.md](./PROMPTS.md) |
| AI assistance explanation | This file |
| Manual improvements | [MANUAL_IMPROVEMENTS.md](./MANUAL_IMPROVEMENTS.md) |
