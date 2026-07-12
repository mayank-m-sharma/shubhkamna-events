import { render, screen } from "@testing-library/react";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the requested semantic tag", () => {
    render(<Heading as="h1">Welcome</Heading>);

    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome" }),
    ).toBeInTheDocument();
  });

  it("renders a different semantic level when requested", () => {
    render(<Heading as="h2">Section title</Heading>);

    expect(
      screen.getByRole("heading", { level: 2, name: "Section title" }),
    ).toBeInTheDocument();
  });

  it("never hardcodes its own content — it only renders what it is given", () => {
    render(<Heading as="h1">{"Anything the CMS provides"}</Heading>);

    expect(screen.getByText("Anything the CMS provides")).toBeInTheDocument();
  });
});
