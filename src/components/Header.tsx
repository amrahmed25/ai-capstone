import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onHomeClick: () => void;
};

function Header({ query, onQueryChange, onSearch, onHomeClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4">
        <Link
          to="/"
          onClick={onHomeClick}
          className="text-lg font-bold tracking-tight text-white"
        >
          MovieApp
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            onClick={onHomeClick}
            className="text-slate-300 transition hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-slate-300 transition hover:text-white"
          >
            Favorites
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit}
          className="ml-auto flex w-full max-w-md gap-2 sm:w-auto"
        >
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Search
          </button>
        </form>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
          >
            {user ? user.email : "Account"}
          </button>
          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    void handleLogout();
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Log in
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
