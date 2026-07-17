import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { ContactInfoPanel } from "./ContactInfoPanel";

jest.mock("@/lib/sanity/image", () => ({
  urlFor: jest.fn(() => ({
    auto: jest.fn().mockReturnThis(),
    url: jest.fn(
      () => "https://cdn.sanity.io/images/proj/ds/mock-800x1000.jpg",
    ),
  })),
}));

const baseProps = {
  intro: "Need an immediate quote? We are open 24/7 for our clients.",
  whatsappNumber: "+919754455007",
  phone: "+919754455007",
  officeAddress:
    "Pragati Chamber, 34/3, Murai Mohalla, Chhawni, Indore, Madhya Pradesh 452001",
  areasServed: ["Indore", "Ujjain", "Dewas"],
};

describe("ContactInfoPanel", () => {
  it("renders the WhatsApp card linking to a wa.me deep link", () => {
    render(<ContactInfoPanel {...baseProps} />);

    expect(screen.getByRole("link", { name: /WhatsApp Chat/ })).toHaveAttribute(
      "href",
      "https://wa.me/919754455007",
    );
  });

  it("renders the call card linking to a tel: URL", () => {
    render(<ContactInfoPanel {...baseProps} />);

    expect(screen.getByRole("link", { name: /Call Us/ })).toHaveAttribute(
      "href",
      "tel:+919754455007",
    );
  });

  it("omits the WhatsApp/call cards independently when their number is missing", () => {
    render(
      <ContactInfoPanel
        {...baseProps}
        whatsappNumber={undefined}
        phone={undefined}
      />,
    );

    expect(
      screen.queryByRole("link", { name: /WhatsApp Chat/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Call Us/ }),
    ).not.toBeInTheDocument();
  });

  it("renders the registered office address when given", () => {
    render(<ContactInfoPanel {...baseProps} />);

    expect(screen.getByText(baseProps.officeAddress)).toBeInTheDocument();
  });

  it("renders every area served as a tag", () => {
    render(<ContactInfoPanel {...baseProps} />);

    for (const area of baseProps.areasServed) {
      expect(screen.getByText(area)).toBeInTheDocument();
    }
  });

  it("renders no areas-served list when empty", () => {
    render(<ContactInfoPanel {...baseProps} areasServed={[]} />);

    expect(screen.queryByText("Areas We Serve")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ContactInfoPanel {...baseProps} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
