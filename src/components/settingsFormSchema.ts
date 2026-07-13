import { z } from "zod";

export const settingsFormSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "es", "fr", "de"]),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  profileVisibility: z.enum(["public", "private"]),
  showActivity: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const defaultSettings: SettingsFormValues = {
  displayName: "",
  email: "",
  theme: "system",
  language: "en",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "public",
  showActivity: true,
};
