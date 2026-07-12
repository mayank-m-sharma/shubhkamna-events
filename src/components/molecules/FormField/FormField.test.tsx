import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { FormField } from "./FormField";

describe("FormField", () => {
  it("associates a visible label with the input", () => {
    render(
      <FormField label="Full name" name="name" value="" onChange={jest.fn()} />,
    );

    expect(
      screen.getByRole("textbox", { name: "Full name" }),
    ).toBeInTheDocument();
  });

  it("renders a textarea when as='textarea'", () => {
    render(
      <FormField
        as="textarea"
        label="Message"
        name="message"
        value=""
        onChange={jest.fn()}
      />,
    );

    const field = screen.getByRole("textbox", { name: "Message" });
    expect(field.tagName).toBe("TEXTAREA");
  });

  it("calls onChange with the typed value", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <FormField label="Full name" name="name" value="" onChange={onChange} />,
    );

    await user.type(screen.getByRole("textbox", { name: "Full name" }), "A");

    expect(onChange).toHaveBeenCalled();
  });

  it("shows a required indicator and marks the field required", () => {
    render(
      <FormField
        label="Full name"
        name="name"
        value=""
        onChange={jest.fn()}
        required
      />,
    );

    expect(screen.getByRole("textbox", { name: /Full name/ })).toBeRequired();
  });

  it("announces the error and ties it to the field via aria-describedby", () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={jest.fn()}
        error="Enter a valid email address"
      />,
    );

    const field = screen.getByRole("textbox", { name: "Email" });
    const errorMessage = screen.getByRole("alert");

    expect(errorMessage).toHaveTextContent("Enter a valid email address");
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAttribute(
      "aria-describedby",
      errorMessage.getAttribute("id"),
    );
  });

  it("does not render an error region when there is no error", () => {
    render(
      <FormField label="Full name" name="name" value="" onChange={jest.fn()} />,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has no axe violations with an error present", async () => {
    const { container } = render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={jest.fn()}
        error="Enter a valid email address"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
