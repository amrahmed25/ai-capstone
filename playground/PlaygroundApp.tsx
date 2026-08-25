import { useRef, useState } from "react";
import Disclosure from "./components/Disclosure";
import ModalDialog from "./components/ModalDialog";
import Tabs from "./components/Tabs";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function PlaygroundApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModalRef = useRef<HTMLButtonElement>(null);

  return (
    <main className="mx-auto max-w-3xl space-y-10 px-4 py-10">
      <header>
        <h1 className="text-2xl font-bold text-white">A11y Playground</h1>
        <p className="mt-2 text-sm text-slate-400">
          Hand-built components following W3C ARIA Authoring Practices. Test
          with keyboard only: Tab, Shift+Tab, Escape, Arrow keys, Home, End.
        </p>
      </header>

      <Section
        title="Modal dialog"
        description="Escape closes. Tab cycles inside. Focus returns to the trigger."
      >
        <button
          ref={openModalRef}
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Open modal
        </button>
        <ModalDialog
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm action"
          returnFocusRef={openModalRef}
        >
          <p>
            This dialog traps focus while open. Press Escape or Close to exit.
          </p>
          <label className="mt-4 block">
            <span className="text-slate-400">Sample field</span>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            />
          </label>
        </ModalDialog>
      </Section>

      <Section
        title="Tabs"
        description="Arrow keys move between tabs. Home/End jump to first/last."
      >
        <Tabs
          label="Playground tabs"
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: "Overview panel content. Tab into this panel to read.",
            },
            {
              id: "details",
              label: "Details",
              content: "Details panel with more information.",
            },
            {
              id: "settings",
              label: "Settings",
              content: (
                <label>
                  <span className="text-slate-400">Setting</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white"
                  />
                </label>
              ),
            },
          ]}
        />
      </Section>

      <Section
        title="Disclosure"
        description="Enter or Space on the button toggles the panel."
      >
        <Disclosure title="What is ARIA?">
          ARIA (Accessible Rich Internet Applications) defines roles, states, and
          properties that make custom widgets understandable to assistive
          technology.
        </Disclosure>
      </Section>
    </main>
  );
}

export default PlaygroundApp;
