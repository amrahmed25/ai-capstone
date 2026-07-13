import { useState, type FormEvent, type ReactNode } from "react";
import {
  defaultSettings,
  type SettingsFormProps,
  type SettingsFormValues,
} from "./settingsFormTypes";

const inputClassName =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const labelClassName = "block text-sm font-medium text-slate-700";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b border-slate-200 pb-8 last:border-b-0 last:pb-0">
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
    </div>
  );
}

function SettingsForm({ initialValues, onSubmit }: SettingsFormProps) {
  const [values, setValues] = useState<SettingsFormValues>({
    ...defaultSettings,
    ...initialValues,
  });
  const [savedMessage, setSavedMessage] = useState("");

  function updateField<K extends keyof SettingsFormValues>(
    key: K,
    value: SettingsFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setSavedMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(values);
    setSavedMessage("Settings saved successfully.");
  }

  function handleReset() {
    setValues({ ...defaultSettings, ...initialValues });
    setSavedMessage("");
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your account preferences and notification settings.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-8">
          <Section
            title="Profile"
            description="Basic information used across the app."
          >
            <div>
              <label htmlFor="displayName" className={labelClassName}>
                Display name
              </label>
              <input
                id="displayName"
                type="text"
                value={values.displayName}
                onChange={(event) =>
                  updateField("displayName", event.target.value)
                }
                placeholder="Jane Doe"
                className={inputClassName}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClassName}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="jane@example.com"
                className={inputClassName}
                autoComplete="email"
                required
              />
            </div>
          </Section>

          <Section
            title="Appearance"
            description="Customize how the app looks and reads."
          >
            <div>
              <label htmlFor="theme" className={labelClassName}>
                Theme
              </label>
              <select
                id="theme"
                value={values.theme}
                onChange={(event) =>
                  updateField(
                    "theme",
                    event.target.value as SettingsFormValues["theme"],
                  )
                }
                className={inputClassName}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label htmlFor="language" className={labelClassName}>
                Language
              </label>
              <select
                id="language"
                value={values.language}
                onChange={(event) =>
                  updateField("language", event.target.value)
                }
                className={inputClassName}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </Section>

          <Section
            title="Notifications"
            description="Choose what updates you want to receive."
          >
            <Toggle
              id="emailNotifications"
              label="Email notifications"
              description="Receive account and security alerts by email."
              checked={values.emailNotifications}
              onChange={(checked) =>
                updateField("emailNotifications", checked)
              }
            />
            <Toggle
              id="pushNotifications"
              label="Push notifications"
              description="Get real-time alerts in your browser."
              checked={values.pushNotifications}
              onChange={(checked) => updateField("pushNotifications", checked)}
            />
            <Toggle
              id="weeklyDigest"
              label="Weekly digest"
              description="A summary of activity sent every Monday."
              checked={values.weeklyDigest}
              onChange={(checked) => updateField("weeklyDigest", checked)}
            />
          </Section>

          <Section
            title="Privacy"
            description="Control who can see your profile and activity."
          >
            <div>
              <label htmlFor="profileVisibility" className={labelClassName}>
                Profile visibility
              </label>
              <select
                id="profileVisibility"
                value={values.profileVisibility}
                onChange={(event) =>
                  updateField(
                    "profileVisibility",
                    event.target.value as SettingsFormValues["profileVisibility"],
                  )
                }
                className={inputClassName}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <Toggle
              id="showActivity"
              label="Show activity status"
              description="Let others see when you were last active."
              checked={values.showActivity}
              onChange={(checked) => updateField("showActivity", checked)}
            />
          </Section>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-sm text-emerald-600"
            role="status"
            aria-live="polite"
          >
            {savedMessage}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingsForm;
