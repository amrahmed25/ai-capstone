import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  label?: string;
};

function Tabs({ tabs, defaultTabId, label = "Sections" }: TabsProps) {
  const baseId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId ?? tabs[0]?.id ?? "",
  );

  function focusTab(tabId: string) {
    const button = tablistRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab-id="${tabId}"]`,
    );
    button?.focus();
  }

  function moveFocus(direction: "prev" | "next" | "first" | "last") {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    switch (direction) {
      case "prev":
        nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case "next":
        nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case "first":
        nextIndex = 0;
        break;
      case "last":
        nextIndex = tabs.length - 1;
        break;
    }

    const nextTab = tabs[nextIndex];
    setActiveTabId(nextTab.id);
    focusTab(nextTab.id);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tabId: string) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        moveFocus("prev");
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        moveFocus("next");
        break;
      case "Home":
        event.preventDefault();
        moveFocus("first");
        break;
      case "End":
        event.preventDefault();
        moveFocus("last");
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setActiveTabId(tabId);
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={label}
        className="flex gap-1 rounded-lg border border-slate-700 bg-slate-900 p-1"
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === activeTabId;
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={tabId}
              data-tab-id={tab.id}
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                isSelected
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isSelected = tab.id === activeTabId;
        const tabId = `${baseId}-tab-${tab.id}`;
        const panelId = `${baseId}-panel-${tab.id}`;

        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            hidden={!isSelected}
            tabIndex={0}
            className="mt-4 rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
