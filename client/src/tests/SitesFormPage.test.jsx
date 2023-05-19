import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../pages/SearchPage";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Search from "../components/search/Search";
import ResultsTable from "../components/search/ResultsTable";

describe("SitesTablePage", () => {
  // create form? - need to manage cookies

  it("protected site create api", async () => {
    const form = {
      siteName: "test",
      siteUrl: "test",
      siteSearchUrl: "test",
      containerSelector: "test",
      itemSelector: "test",
      imageSelector: "test",
      titleSelector: "test",
      authorSelector: "test",
      priceSelector: "test",
      availabelSelector: "test",
      bookUrlSelector: "test",
    };
    
    const response = await fetch("http://127.0.0.1:3000/site", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assert the response status code
    expect(response.status).toBe(401);
  });
});
