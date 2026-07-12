import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState, type ReactNode } from "react";

import { useFocusTrap } from "./useFocusTrap";

function TestPanel({ onClose }: { onClose: jest.Mock }): ReactNode {
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(containerRef, {
    active,
    onClose: () => {
      setActive(false);
      onClose();
    },
    returnFocusRef: triggerRef,
  });

  return (
    <>
      <button ref={triggerRef}>Open trigger</button>
      {active ? (
        <div ref={containerRef} data-testid="panel">
          <button>First</button>
          <button>Second</button>
          <button>Last</button>
        </div>
      ) : null}
    </>
  );
}

describe("useFocusTrap", () => {
  it("moves focus to the first focusable element when activated", () => {
    render(<TestPanel onClose={jest.fn()} />);

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<TestPanel onClose={onClose} />);

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("wraps focus from the last element to the first on Tab", async () => {
    const user = userEvent.setup();
    render(<TestPanel onClose={jest.fn()} />);

    screen.getByRole("button", { name: "Last" }).focus();
    await user.tab();

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
  });

  it("wraps focus from the first element to the last on Shift+Tab", async () => {
    const user = userEvent.setup();
    render(<TestPanel onClose={jest.fn()} />);

    screen.getByRole("button", { name: "First" }).focus();
    await user.tab({ shift: true });

    expect(screen.getByRole("button", { name: "Last" })).toHaveFocus();
  });

  it("returns focus to returnFocusRef's element once deactivated", async () => {
    const user = userEvent.setup();
    render(<TestPanel onClose={jest.fn()} />);

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open trigger" })).toHaveFocus();
  });
});
