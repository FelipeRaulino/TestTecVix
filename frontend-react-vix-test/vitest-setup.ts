import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { createSerializer } from "@emotion/jest";

vi.mock("lottie-react", () => ({
  default: () => "Lottie Animation",
  useLottie: () => ({
    View: "Lottie Animation",
  }),
}));

expect.addSnapshotSerializer(createSerializer());

afterEach(() => {
  cleanup();
});
