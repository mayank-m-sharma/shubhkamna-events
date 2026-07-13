import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ContactSection } from "./ContactSection";

jest.mock("@/lib/actions/submitEnquiry", () => ({
  submitEnquiry: jest.fn(),
}));

describe("ContactSection", () => {
  describe("banner variant", () => {
    it("renders the heading and intro", () => {
      render(
        <ContactSection
          variant="banner"
          heading="Ready to Create Magical Moments?"
          intro="Contact the 5-star experts today."
        />,
      );

      expect(
        screen.getByRole("heading", {
          name: "Ready to Create Magical Moments?",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Contact the 5-star experts today."),
      ).toBeInTheDocument();
    });

    it("renders a call CTA only when phone is given", () => {
      const { rerender } = render(
        <ContactSection variant="banner" phone="+919754455007" />,
      );
      expect(
        screen.getByRole("link", { name: /\+919754455007/ }),
      ).toHaveAttribute("href", "tel:+919754455007");

      rerender(<ContactSection variant="banner" />);
      expect(
        screen.queryByRole("link", { name: /\+919754455007/ }),
      ).not.toBeInTheDocument();
    });

    it("renders a WhatsApp CTA only when whatsappNumber is given", () => {
      const { rerender } = render(
        <ContactSection variant="banner" whatsappNumber="+919754455007" />,
      );
      expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
        "href",
        "https://wa.me/919754455007",
      );

      rerender(<ContactSection variant="banner" />);
      expect(
        screen.queryByRole("link", { name: /WhatsApp/ }),
      ).not.toBeInTheDocument();
    });

    it("does not render the enquiry form", () => {
      render(<ContactSection variant="banner" />);

      expect(screen.queryByLabelText(/Full Name/)).not.toBeInTheDocument();
    });

    it("has no axe violations", async () => {
      const { container } = render(
        <ContactSection
          variant="banner"
          heading="Ready to Create Magical Moments?"
          intro="Contact the 5-star experts today."
          phone="+919754455007"
          whatsappNumber="+919754455007"
        />,
      );

      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("form variant", () => {
    it("renders the heading, intro, and the full enquiry form", () => {
      render(
        <ContactSection
          variant="form"
          heading="Let's Create Magic Together"
          intro="Bespoke planning tailored to your vision."
        />,
      );

      expect(
        screen.getByRole("heading", { name: "Let's Create Magic Together" }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument();
    });

    it("does not render the banner CTAs", () => {
      render(
        <ContactSection
          variant="form"
          phone="+919754455007"
          whatsappNumber="+919754455007"
        />,
      );

      expect(
        screen.queryByRole("link", { name: /\+919754455007/ }),
      ).not.toBeInTheDocument();
    });

    it("has no axe violations", async () => {
      const { container } = render(
        <ContactSection
          variant="form"
          heading="Let's Create Magic Together"
          intro="Bespoke planning tailored to your vision."
        />,
      );

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
