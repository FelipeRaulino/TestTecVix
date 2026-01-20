import React from "react";
import { render } from "@testing-library/react";
import { it, expect, describe, vi, Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import { LogoBrand } from "../../../src/components/LogoBrand";
import { useZTheme } from "../../../src/stores/useZTheme";
import { useZBrandInfo } from "../../../src/stores/useZBrandStore";

vi.mock("../../../src/stores/useZTheme", () => ({
  useZTheme: vi.fn(),
}));

vi.mock("../../../src/stores/useZBrandStore", () => ({
  useZBrandInfo: vi.fn(),
}));

describe("LogoBrand Component", () => {
  it("renders the logo with the correct src and alt attributes", () => {
    (useZTheme as unknown as Mock).mockReturnValue({
      mode: "light",
      theme: {
        light: { white: "#FFFFFF" },
        dark: { white: "#000000" },
      },
    });

    (useZBrandInfo as unknown as Mock).mockReturnValue({
      brandLogo: "https://example.com/logo.png",
    });

    const { getByAltText } = render(<LogoBrand />);

    const logoImage = getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "https://example.com/logo.png");
    expect(logoImage).toHaveAttribute("alt", "logo");
  });



  it("matches the snapshot", () => {
    (useZTheme as unknown as Mock).mockReturnValue({
      mode: "light",
      theme: {
        light: { white: "#FFFFFF" },
        dark: { white: "#000000" },
      },
    });

    (useZBrandInfo as unknown as Mock).mockReturnValue({
      brandLogo: "https://example.com/logo.png",
    });

    const { container } = render(<LogoBrand />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
