import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthMode } from "./authModel";
import { loginAccount, registerAccount } from "./authModel";

export function useAuthViewModel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        await loginAccount(email, password);
      } else {
        await registerAccount(email, password);
      }

      setPassword("");
      navigate("/favorites");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Authentication failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setMode((current) => (current === "login" ? "register" : "login"));
    setError(null);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  };
}
