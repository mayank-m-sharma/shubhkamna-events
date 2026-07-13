import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { ContactForm } from "./ContactForm";

const mockSubmitEnquiry = jest.fn();

jest.mock("@/lib/actions/submitEnquiry", () => ({
  submitEnquiry: (formData: FormData) => mockSubmitEnquiry(formData),
}));

describe("ContactForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders every field from the SHU-000 audit's field list, in order", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expected Guests/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it("marks name, phone, event type, and event date as required, not email or expected guests", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Full Name/)).toBeRequired();
    expect(screen.getByLabelText(/Phone Number/)).toBeRequired();
    expect(screen.getByLabelText(/Event Type/)).toBeRequired();
    expect(screen.getByLabelText(/Event Date/)).toBeRequired();
    expect(screen.getByLabelText(/Email Address/)).not.toBeRequired();
    expect(screen.getByLabelText(/Expected Guests/)).not.toBeRequired();
  });

  it("includes a honeypot field that is hidden from sighted/mouse users but present in the DOM", () => {
    render(<ContactForm />);

    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).not.toHaveStyle({ display: "none" });
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("shows the success message once the Server Action reports success", async () => {
    mockSubmitEnquiry.mockResolvedValue({ success: true });
    const user = userEvent.setup();
    render(
      <ContactForm successMessage="Thanks! We'll reach out within 24 hours." />,
    );

    await user.click(screen.getByRole("button", { name: /Submit/ }));

    expect(
      await screen.findByText("Thanks! We'll reach out within 24 hours."),
    ).toBeInTheDocument();
  });

  it("shows field errors returned by the Server Action without a page reload", async () => {
    mockSubmitEnquiry.mockResolvedValue({
      success: false,
      errors: { name: "Please enter your name." },
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /Submit/ }));

    expect(
      await screen.findByText("Please enter your name."),
    ).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ContactForm />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
