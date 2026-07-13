export type SettingsFormValues = {
  displayName: string;
  email: string;
  theme: "light" | "dark" | "system";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  profileVisibility: "public" | "private";
  showActivity: boolean;
};

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

export type SettingsFormProps = {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit?: (values: SettingsFormValues) => void;
};
