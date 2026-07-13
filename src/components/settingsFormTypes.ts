import type { SettingsFormValues } from "./settingsFormSchema";

export type { SettingsFormValues };
export { defaultSettings } from "./settingsFormSchema";

export type SettingsFormProps = {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit?: (values: SettingsFormValues) => void;
};
