import {
  loginUser,
  registerUser,
} from "../../services/authService";

export type AuthMode = "login" | "register";

export async function registerAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters");
  }

  return registerUser(normalizedEmail, password);
}

export async function loginAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required");
  }

  return loginUser(normalizedEmail, password);
}
