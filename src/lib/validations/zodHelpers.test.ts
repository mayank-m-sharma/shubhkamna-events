import { z } from "zod";

import { optionalNullable } from "./zodHelpers";

describe("optionalNullable", () => {
  const schema = z.object({ name: optionalNullable(z.string()) });

  it("passes through a real value unchanged", () => {
    const result = schema.parse({ name: "Shubhkamna Events" });

    expect(result.name).toBe("Shubhkamna Events");
  });

  it("normalizes GROQ's null to undefined", () => {
    const result = schema.parse({ name: null });

    expect(result.name).toBeUndefined();
  });

  it("leaves an omitted field as undefined", () => {
    const result = schema.parse({});

    expect(result.name).toBeUndefined();
  });
});
