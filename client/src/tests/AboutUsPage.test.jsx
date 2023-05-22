import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AboutUs from "../pages/AboutUsPage";
import messages from "../helpers/messages";

describe("AboutUsPage", () => {
  it("renders about us text", () => {
    render(<AboutUs />);

    messages.aboutUs.forEach((element) => {
      const textElement = screen.getByText(element);
      expect(textElement).toBeInTheDocument();
    });
  });
});
