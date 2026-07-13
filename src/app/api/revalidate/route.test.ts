/**
 * @jest-environment node
 */
// Route Handlers run in Next's Node runtime, not the browser — NextRequest
// depends on the native Request/Response globals jsdom doesn't provide.
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { POST } from "./route";

jest.mock("next-sanity/webhook", () => ({
  parseBody: jest.fn(),
}));
jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

const mockParseBody = parseBody as jest.Mock;
const mockRevalidateTag = revalidateTag as jest.Mock;

function buildRequest(): NextRequest {
  return new NextRequest("http://localhost:3000/api/revalidate", {
    method: "POST",
    body: "{}",
  });
}

describe("POST /api/revalidate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 when the webhook signature is invalid", async () => {
    mockParseBody.mockResolvedValue({ isValidSignature: false, body: null });

    const response = await POST(buildRequest());

    expect(response.status).toBe(401);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("returns 400 when the payload has no _type", async () => {
    mockParseBody.mockResolvedValue({ isValidSignature: true, body: {} });

    const response = await POST(buildRequest());

    expect(response.status).toBe(400);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates the tag matching the changed document's _type", async () => {
    mockParseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "homePage", _id: "homePage" },
    });

    const response = await POST(buildRequest());
    const json = await response.json();

    expect(mockRevalidateTag).toHaveBeenCalledWith("homePage", "max");
    expect(json.revalidated).toBe(true);
  });
});
