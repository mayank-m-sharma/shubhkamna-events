import { splitHeadline } from "./splitHeadline";

describe("splitHeadline", () => {
  it("splits off the highlight when it matches the end of the headline", () => {
    expect(splitHeadline("Your Vision, Our Magic.", "Our Magic.")).toEqual({
      rest: "Your Vision, ",
      highlight: "Our Magic.",
    });
  });

  it("returns the full headline with no highlight when unset", () => {
    expect(splitHeadline("Your Vision, Our Magic.")).toEqual({
      rest: "Your Vision, Our Magic.",
      highlight: undefined,
    });
  });

  it("returns the full headline with no highlight when it doesn't match the end", () => {
    expect(splitHeadline("Your Vision, Our Magic.", "Nonexistent")).toEqual({
      rest: "Your Vision, Our Magic.",
      highlight: undefined,
    });
  });
});
