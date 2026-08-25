# MovieApp — AI Capstone

A React movie discovery app built with **AI-assisted development** (Cursor), following the workflow from the PowerCommerce mentor session. Search movies via the [OMDB API](https://www.omdbapi.com/), save favorites per user with **Firebase Authentication** and **Realtime Database**.

## Features

- Browse 20 random movies on each visit (seed-keyword algorithm)
- Search the OMDB catalog from the header
- User registration and login (Firebase Auth)
- Save and remove favorite movies (per-user in Realtime Database)
- MVVM architecture: Model → ViewModel → View separation
- Dark cinema-themed UI with Tailwind CSS

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS |
| Routing | React Router |
| Backend | Firebase Auth + Realtime Database |
| API | OMDB |
| Build | Vite |
| Quality | ESLint, Vitest |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/amrahmed25/ai-capstone.git
cd ai-capstone
npm install
```

### 2. Environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_OMDB_API_KEY` | Free key from [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) |
| `VITE_OMDB_API_URL` | `https://www.omdbapi.com/` |
| `VITE_FIREBASE_*` | From Firebase Console → Project settings |

### 3. Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Create a **Realtime Database** (test mode for development)
4. Copy config values into `.env`

### 4. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── components/       # Header, MovieCard, ProtectedRoute
├── context/          # AuthContext
├── pages/
│   ├── home/         # homeModel, useHomeViewModel, HomeView
│   ├── favorites/    # favoritesModel, useFavoritesViewModel, FavoritesView
│   └── auth/         # authModel, useAuthViewModel, AuthView
├── services/         # omdbMovieService, firebaseService, authService
└── types/            # Movie, OMDbSearchResponse
```

## Assignment Submission

| Deliverable | File |
| --- | --- |
| Completed application | `src/` |
| Prompts used | [PROMPTS.md](./PROMPTS.md) |
| AI assistance explanation | [AI_ASSISTANCE.md](./AI_ASSISTANCE.md) |
| Manual improvements | [MANUAL_IMPROVEMENTS.md](./MANUAL_IMPROVEMENTS.md) |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run test     # Vitest
```

## License

[MIT](./LICENSE)
