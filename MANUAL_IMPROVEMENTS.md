# Manual Improvements After AI Review

These are concrete examples of changes made **after** reviewing AI-generated code — corrections, refactoring, and quality improvements that required human judgment.

---

## 1. Consolidated duplicate Firebase initialization

**Issue:** AI created separate Firebase `initializeApp` calls in `firebaseService.ts` and `authService.ts`, which would throw on the second initialization.

**Fix:** Extracted a shared `firebaseConfig.ts` that initializes the app once and exports both `auth` and `database`.

```typescript
// Before (two files each calling initializeApp)
// After: single firebaseConfig.ts used by both services
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const database = getDatabase(app);
```

---

## 2. Lifted home state to App for Header integration

**Issue:** AI initially gave `HomeView` its own search input **and** a separate `Header` search bar, duplicating UI and state.

**Fix:** Removed search from `HomeView`, lifted `useHomeViewModel` to `AppRoutes`, and passed `query`, `setQuery`, `handleSearch`, and `loadInitialMovies` as props to `Header`. One source of truth for search.

---

## 3. Replaced dynamic import in favorite handler

**Issue:** AI used `import("../../services/firebaseService").then(...)` inside `handleFavoriteClick` for lazy loading — unnecessary indirection in a small app.

**Fix:** Static import at the top of `useHomeViewModel.ts` with proper optimistic UI update and rollback on failure.

---

## 4. Per-user favorites path

**Issue:** Early AI version stored favorites globally under `/favorites` instead of per authenticated user.

**Fix:** Updated Firebase paths to `users/{userId}/favorites/{imdbID}` so each account has isolated data, matching the mentor session's final design.

---

## 5. Auth redirect for favorite button

**Issue:** AI wired the favorite button to save movies without checking authentication first.

**Fix:** Added `navigate("/auth")` when an unauthenticated user clicks "Add to favorites", plus a `ProtectedRoute` wrapper on `/favorites`.

---

## 6. Readable Firebase auth errors

**Issue:** AI initially surfaced raw Firebase error codes (`auth/invalid-credential`) to users.

**Fix:** Added `toReadableAuthError()` mapping in `authService.ts` to show human-friendly messages.

---

## 7. Poster fallback for missing images

**Issue:** OMDB returns `"N/A"` for posters; AI rendered broken `<img>` tags.

**Fix:** Added a check in `MovieCard` to show a placeholder when `Poster` is missing or `"N/A"`.

---

## 8. Removed unnecessary auth bridge file

**Issue:** AI created `authServiceBridge.ts` as a thin re-export layer between `authModel` and `authService`.

**Fix:** Deleted the bridge and imported `authService` functions directly in `authModel.ts` to reduce file count without losing MVVM separation.

---

## 9. Home click reload bug

**Issue:** After searching, clicking "Home" left stale search results on screen (same bug shown in the mentor video).

**Fix:** Implemented `loadInitialMovies()` that clears query, resets error, and fetches a fresh random batch — triggered from Header's Home link via `onHomeClick` prop.

---

## 10. Environment variable prefix

**Issue:** Mentor session used generic `.env` keys; Vite requires `VITE_` prefix for client exposure.

**Fix:** Standardized all env vars as `VITE_OMDB_API_KEY`, `VITE_FIREBASE_*` and documented them in `.env.example`.
