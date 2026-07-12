import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { Button } from "./Button";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies the primary variant by default", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveClass("primary");
  });

  it("applies the requested variant", () => {
    render(<Button variant="ghost">Cancel</Button>);

    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass("ghost");
  });

  it("calls onClick when activated", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects an explicit submit type", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("renders as disabled and does not call onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a link when href is given", () => {
    render(<Button href="/contact">Contact us</Button>);

    const link = screen.getByRole("link", { name: "Contact us" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Button>Save</Button>);

    expect(await axe(container)).toHaveNoViolations();
  });
});
