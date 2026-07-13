import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import SettingsForm from "./SettingsForm";

const validInitialValues = {
  displayName: "Jane Doe",
  email: "jane@example.com",
};

function renderSettingsForm(
  props: Partial<ComponentProps<typeof SettingsForm>> = {},
) {
  return render(<SettingsForm {...props} />);
}

describe("SettingsForm", () => {
  it("renders fields with accessible labels", () => {
    renderSettingsForm();

    expect(
      screen.getByRole("heading", { name: "Settings" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Display name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Theme")).toBeInTheDocument();
    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Email notifications")).toBeInTheDocument();
    expect(screen.getByLabelText("Push notifications")).toBeInTheDocument();
    expect(screen.getByLabelText("Weekly digest")).toBeInTheDocument();
    expect(screen.getByLabelText("Profile visibility")).toBeInTheDocument();
    expect(screen.getByLabelText("Show activity status")).toBeInTheDocument();
  });

  it("disables save until the form is valid", async () => {
    renderSettingsForm();

    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Save changes" }),
      ).toBeDisabled();
    });
  });

  it("enables save when initial values are valid", async () => {
    renderSettingsForm({ initialValues: validInitialValues });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Save changes" }),
      ).toBeEnabled();
    });
  });

  it("shows validation errors for invalid input", async () => {
    const user = userEvent.setup();
    renderSettingsForm();

    await user.type(screen.getByLabelText("Display name"), "J");
    await user.type(screen.getByLabelText("Email address"), "not-an-email");

    await waitFor(() => {
      expect(
        screen.getByText("Display name must be at least 2 characters"),
      ).toBeInTheDocument();
      expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText("Display name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("submits valid values and shows a success message", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    renderSettingsForm({ initialValues: validInitialValues, onSubmit });

    const saveButton = screen.getByRole("button", { name: "Save changes" });
    await waitFor(() => expect(saveButton).toBeEnabled());

    await user.click(saveButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce();
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining(validInitialValues),
      );
      expect(
        screen.getByText("Settings saved successfully."),
      ).toBeInTheDocument();
    });
  });

  it("resets fields to initial values", async () => {
    const user = userEvent.setup();

    renderSettingsForm({ initialValues: validInitialValues });

    const displayName = screen.getByLabelText("Display name");
    await user.clear(displayName);
    await user.type(displayName, "John Smith");

    expect(displayName).toHaveValue("John Smith");

    await user.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(displayName).toHaveValue("Jane Doe");
    });
  });
});
