import { Navigate, Route, Routes } from "react-router-dom";
import PlaygroundApp from "../../playground/PlaygroundApp";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthView from "./pages/auth/AuthView";
import FavoritesView from "./pages/favorites/FavoritesView";
import HomeView from "./pages/home/HomeView";
import { useHomeViewModel } from "./pages/home/useHomeViewModel";

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/favorites" replace />;
  }

  return children;
}

function PlaygroundRoute() {
  return <PlaygroundApp />;
}

function AppRoutes() {
  const home = useHomeViewModel();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header
        query={home.query}
        onQueryChange={home.setQuery}
        onSearch={() => void home.handleSearch()}
        onHomeClick={() => void home.loadInitialMovies()}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              movies={home.movies}
              favoriteIds={home.favoriteIds}
              loading={home.loading}
              error={home.error}
              onFavoriteClick={(movie) => void home.handleFavoriteClick(movie)}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesView />
            </ProtectedRoute>
          }
        />
        <Route path="/playground" element={<PlaygroundRoute />} />
        <Route
          path="/auth"
          element={
            <AuthRedirect>
              <AuthView />
            </AuthRedirect>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
