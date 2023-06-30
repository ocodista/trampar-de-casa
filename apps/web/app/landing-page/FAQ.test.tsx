import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("renders properly", () => {
    render(<FAQ />);
    screen.debug();
  });
});
