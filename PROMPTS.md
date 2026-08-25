# Development Prompts

This document lists the prompts used to build the MovieApp with AI assistance (Cursor), following the workflow from the mentor session with Ishak.

---

## 1. Project initialization

```
Initialize a new React application using Vite, React, and TypeScript.
Use functional components only.
Use Tailwind CSS for styling.
Do not install any UI library and do not add movie functionality yet.
We only want the default scaffold.
```

---

## 2. Clean slate

```
Remove all default Vite demo content, images, styles, and demonstration code.
Leave a minimal working React application with an empty App component.
Do not create any additional components or functionality yet.
```

---

## 3. Header component

```
Create a reusable Header component.
The header should contain:
- A Home navigation link
- A Favorites navigation link
- A search input
- A search button
- An account menu with login/logout

Use React Router Links for navigation.
Only create and display the header.
Do not create the Home or Favorites screens yet.
Do not connect the search input to any functionality yet.
Style it with Tailwind CSS using a dark cinema theme.
```

---

## 4. MVVM structure — Home

```
Create the empty MVVM file structure for the Home screen:
- src/pages/home/homeModel.ts
- src/pages/home/useHomeViewModel.ts
- src/pages/home/HomeView.tsx

Requirements:
- homeModel: home-specific data and business logic
- useHomeViewModel: React state and actions (later)
- HomeView: renders the home interface (later)

Create only minimal placeholder exports so the application compiles.
Do not add API requests, React state, or movie UI yet.
```

---

## 5. MVVM structure — Favorites

```
Create the empty MVVM file structure for the Favorites screen:
- src/pages/favorites/favoritesModel.ts
- src/pages/favorites/useFavoritesViewModel.ts
- src/pages/favorites/FavoritesView.tsx

Same separation of concerns as Home.
Create only minimal placeholder exports.
```

---

## 6. OMDB service

```
Create src/services/omdbMovieService.ts and src/types/movie.ts.

Implement an exported async function searchMovies(query: string).

Requirements:
- Use the OMDB API
- Read the API key from import.meta.env.VITE_OMDB_API_KEY
- Encode the search query
- Use Movie and OMDbSearchResponse types
- Return the Search array as Movie[]
- Throw readable errors when HTTP fails or OMDB returns Response: "False"
- Do not use React hooks
```

---

## 7. Home model — search

```
Implement homeModel.ts:
- Import searchMovies from omdbMovieService
- Export getMovies(query)

Responsibilities:
- Trim the query
- Validate at least 2 characters
- Call searchMovies with the cleaned query
- Return the movie list

Do not use React hooks or call fetch directly.
```

---

## 8. Home view model

```
Implement useHomeViewModel.ts:
- Manage query, movies, loading, error with useState
- handleSearch: set loading, clear error, call getMovies, save results
- Return query, setQuery, movies, loading, error, handleSearch

Do not render JSX.
Do not import omdbMovieService directly — use homeModel only.
```

---

## 9. Home view

```
Implement HomeView.tsx:
- Display loading and error states
- Render movies with MovieCard using .map()
- Connect favorite button through view model

Do not call fetch directly.
Do not import homeModel or omdbMovieService in the view.
```

---

## 10. Initial random movies

```
Add getInitialMovies() to homeModel.ts:
- Fetch at least 20 movies on app launch
- Use random keywords from a seed list (Batman, Avengers, Harry Potter, etc.)
- Use Promise.all for parallel requests
- Deduplicate by imdbID, shuffle, return exactly 20 unique movies
- Keep all fetching logic in homeModel

Update useHomeViewModel to load initial movies on mount.
```

---

## 11. MovieCard component

```
Create src/components/MovieCard.tsx:
- Receive one Movie through props
- Display poster, title, year, type
- Add favorite button (callback via props)
- Keep the component presentational

Update HomeView to use MovieCard.
```

---

## 12. Bug fix — Home reload

```
When searching and then clicking Home, random movies should reload.
Extract loadInitialMovies and pass onHomeClick to Header.
Clear query and reload initial movies when Home is clicked.
```

---

## 13. Firebase setup

```
Create Firebase configuration using environment variables:
- src/services/firebaseConfig.ts
- src/services/firebaseService.ts

Initialize Firebase app and Realtime Database.
Add addFavoriteMovie, removeFavoriteMovie, getFavorites.
Store favorites under users/{userId}/favorites/{imdbID}.
Do not add authentication UI yet.
```

---

## 14. Favorites MVVM implementation

```
Implement favoritesModel, useFavoritesViewModel, and FavoritesView:
- Load favorites when screen opens (useEffect)
- Display loading, error, and empty states
- Render favorites with MovieCard
- Allow removing favorites
- Do not call Firebase directly from the view
```

---

## 15. Authentication

```
Create authService.ts, authModel.ts, useAuthViewModel.ts, AuthView.tsx, and AuthContext:
- registerUser, loginUser, logoutUser, subscribeToAuthChanges
- Login/register form with mode toggle
- AuthProvider wrapping the app
- Protected /favorites route
- Redirect unauthenticated users to /auth when favoriting
- Redirect authenticated users away from /auth
```

---

## 16. Routing

```
Update App.tsx with React Router:
- / — Home (public)
- /favorites — protected
- /auth — login/register (redirect if already logged in)
- Preserve Header on every page
- Lift useHomeViewModel to App so Header search shares state with Home
```

---

## 17. Submission documentation

```
Create PROMPTS.md, AI_ASSISTANCE.md, and update README.md with:
- Setup instructions
- Environment variable configuration
- Architecture overview (MVVM)
- How AI assisted development
- Examples of manual improvements after AI generation
```
