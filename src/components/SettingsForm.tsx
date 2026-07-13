import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  defaultSettings,
  settingsFormSchema,
  type SettingsFormValues,
} from "./settingsFormSchema";
import type { SettingsFormProps } from "./settingsFormTypes";

const inputClassName =
  "mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2";

const inputValidClassName =
  "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20";

const inputInvalidClassName =
  "border-red-400 focus:border-red-500 focus:ring-red-500/20";

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
    <section
      aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
      className="space-y-4 border-b border-slate-200 pb-8 last:border-b-0 last:pb-0"
    >
      <div>
        <h2
          id={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
          className="text-base font-semibold text-slate-900"
        >
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

function SettingsForm({ initialValues, onSubmit }: SettingsFormProps) {
  const [savedMessage, setSavedMessage] = useState("");
  const mergedDefaults = { ...defaultSettings, ...initialValues };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: mergedDefaults,
    mode: "onChange",
  });

  function handleValidSubmit(values: SettingsFormValues) {
    onSubmit?.(values);
    setSavedMessage("Settings saved successfully.");
  }

  function handleReset() {
    reset(mergedDefaults);
    setSavedMessage("");
  }

  function fieldClassName(hasError: boolean) {
    return `${inputClassName} ${hasError ? inputInvalidClassName : inputValidClassName}`;
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
        noValidate
        onSubmit={handleSubmit(handleValidSubmit)}
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
                placeholder="Jane Doe"
                autoComplete="name"
                aria-invalid={errors.displayName ? true : undefined}
                aria-describedby={
                  errors.displayName ? "displayName-error" : undefined
                }
                className={fieldClassName(Boolean(errors.displayName))}
                {...register("displayName")}
              />
              <FieldError
                id="displayName-error"
                message={errors.displayName?.message}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClassName}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClassName(Boolean(errors.email))}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
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
                className={fieldClassName(false)}
                {...register("theme")}
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
                className={fieldClassName(false)}
                {...register("language")}
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
            <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium text-slate-900"
                >
                  Email notifications
                </label>
                <p
                  id="emailNotifications-description"
                  className="mt-0.5 text-sm text-slate-500"
                >
                  Receive account and security alerts by email.
                </p>
              </div>
              <input
                id="emailNotifications"
                type="checkbox"
                aria-describedby="emailNotifications-description"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                {...register("emailNotifications")}
              />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <label
                  htmlFor="pushNotifications"
                  className="text-sm font-medium text-slate-900"
                >
                  Push notifications
                </label>
                <p
                  id="pushNotifications-description"
                  className="mt-0.5 text-sm text-slate-500"
                >
                  Get real-time alerts in your browser.
                </p>
              </div>
              <input
                id="pushNotifications"
                type="checkbox"
                aria-describedby="pushNotifications-description"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                {...register("pushNotifications")}
              />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <label
                  htmlFor="weeklyDigest"
                  className="text-sm font-medium text-slate-900"
                >
                  Weekly digest
                </label>
                <p
                  id="weeklyDigest-description"
                  className="mt-0.5 text-sm text-slate-500"
                >
                  A summary of activity sent every Monday.
                </p>
              </div>
              <input
                id="weeklyDigest"
                type="checkbox"
                aria-describedby="weeklyDigest-description"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                {...register("weeklyDigest")}
              />
            </div>
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
                className={fieldClassName(false)}
                {...register("profileVisibility")}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <label
                  htmlFor="showActivity"
                  className="text-sm font-medium text-slate-900"
                >
                  Show activity status
                </label>
                <p
                  id="showActivity-description"
                  className="mt-0.5 text-sm text-slate-500"
                >
                  Let others see when you were last active.
                </p>
              </div>
              <input
                id="showActivity"
                type="checkbox"
                aria-describedby="showActivity-description"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                {...register("showActivity")}
              />
            </div>
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
              disabled={!isValid}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
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
