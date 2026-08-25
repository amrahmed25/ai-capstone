import { useId, useState, type ReactNode } from "react";

export type DisclosureProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const buttonId = useId();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function toggle() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white hover:bg-slate-800"
        >
          {title}
          <span aria-hidden="true" className="text-slate-400">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="border-t border-slate-700 px-4 py-3 text-sm text-slate-300"
      >
        {children}
      </div>
    </div>
  );
}

export default Disclosure;
