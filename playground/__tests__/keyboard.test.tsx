import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Disclosure from "../components/Disclosure";
import ModalDialog from "../components/ModalDialog";
import Tabs from "../components/Tabs";

describe("ModalDialog keyboard", () => {
  it("closes on Escape and returns focus to trigger", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <div>
        <button type="button" id="trigger">
          Open
        </button>
        <ModalDialog
          isOpen
          onClose={onClose}
          title="Test dialog"
          returnFocusRef={{ current: document.getElementById("trigger") }}
        >
          <button type="button">Inside</button>
        </ModalDialog>
      </div>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps Tab focus inside the dialog", async () => {
    const user = userEvent.setup();

    render(
      <ModalDialog isOpen onClose={() => undefined} title="Trap test">
        <button type="button">First</button>
        <button type="button">Second</button>
      </ModalDialog>,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    const first = screen.getByRole("button", { name: "First" });

    first.focus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();
    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
  });
});

describe("Tabs keyboard", () => {
  const tabs = [
    { id: "a", label: "Tab A", content: "Panel A" },
    { id: "b", label: "Tab B", content: "Panel B" },
    { id: "c", label: "Tab C", content: "Panel C" },
  ];

  it("moves selection with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} defaultTabId="a" />);

    const tabA = screen.getByRole("tab", { name: "Tab A" });
    tabA.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveFocus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Tab C" })).toHaveFocus();
  });
});

describe("Disclosure keyboard", () => {
  it("toggles with Enter and Space", async () => {
    const user = userEvent.setup();
    render(<Disclosure title="Section">Hidden content</Disclosure>);

    const button = screen.getByRole("button", { name: "Section" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    button.focus();
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden content")).toBeVisible();

    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
