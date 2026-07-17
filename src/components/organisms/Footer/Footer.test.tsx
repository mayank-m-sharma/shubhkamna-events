import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Footer } from "./Footer";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Services",
    links: [{ label: "Wedding Planning", href: "/services" }],
  },
];

const socialLinks = [
  {
    platform: "instagram" as const,
    url: "https://www.instagram.com/shubhkamnaevents02/",
  },
];

describe("Footer", () => {
  it("renders every CMS-driven column with its links", () => {
    render(<Footer columns={columns} socialLinks={[]} />);

    expect(
      screen.getByRole("heading", { name: "Quick Links" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Services" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: "Wedding Planning" }),
    ).toHaveAttribute("href", "/services");
  });

  it("renders the contact block when phone, email, and address are all given", () => {
    render(
      <Footer
        columns={[]}
        socialLinks={[]}
        contactPhone="+919754455007"
        contactEmail="shubhkamnaevents02@gmail.com"
        contactAddress="Indore, Madhya Pradesh"
      />,
    );

    expect(
      screen.getByRole("link", { name: /\+919754455007/ }),
    ).toHaveAttribute("href", "tel:+919754455007");
    expect(
      screen.getByRole("link", { name: "shubhkamnaevents02@gmail.com" }),
    ).toHaveAttribute("href", "mailto:shubhkamnaevents02@gmail.com");
    expect(screen.getByText("Indore, Madhya Pradesh")).toBeInTheDocument();
  });

  it("degrades gracefully when contact fields are missing", () => {
    render(
      <Footer columns={[]} socialLinks={[]} contactPhone="+919754455007" />,
    );

    expect(
      screen.getByRole("link", { name: /\+919754455007/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /@/ })).not.toBeInTheDocument();
  });

  it("renders no contact block at all when every field is missing", () => {
    const { container } = render(<Footer columns={[]} socialLinks={[]} />);

    expect(container.querySelector("address")).not.toBeInTheDocument();
  });

  it("renders a WhatsApp link built from siteSettings' number when given", () => {
    render(
      <Footer columns={[]} socialLinks={[]} whatsappNumber="+919754455007" />,
    );

    expect(
      screen.getByRole("link", { name: /Chat on WhatsApp/ }),
    ).toHaveAttribute("href", "https://wa.me/919754455007");
  });

  it("does not render a WhatsApp link when no number is configured", () => {
    render(<Footer columns={[]} socialLinks={[]} />);

    expect(
      screen.queryByRole("link", { name: /Chat on WhatsApp/ }),
    ).not.toBeInTheDocument();
  });

  it("renders the social links list", () => {
    render(<Footer columns={[]} socialLinks={socialLinks} />);

    expect(screen.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
      "href",
      socialLinks[0]?.url,
    );
  });

  it("renders the copyright line with the current year, never hand-typed", () => {
    render(
      <Footer
        columns={[]}
        socialLinks={[]}
        copyrightText="Shubhkamna Events Indore. All rights reserved."
      />,
    );

    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(
        `© ${currentYear} Shubhkamna Events Indore. All rights reserved.`,
      ),
    ).toBeInTheDocument();
  });

  it("still renders the current year when no copyright text is configured", () => {
    render(<Footer columns={[]} socialLinks={[]} />);

    const currentYear = new Date().getFullYear();

    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Footer
        columns={columns}
        socialLinks={socialLinks}
        contactPhone="+919754455007"
        contactEmail="shubhkamnaevents02@gmail.com"
        contactAddress="Indore, Madhya Pradesh"
        copyrightText="Shubhkamna Events Indore. All rights reserved."
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
