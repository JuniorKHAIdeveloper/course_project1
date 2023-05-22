import "@testing-library/jest-dom";

describe("SitesFormPage", () => {
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

    expect(response.status).toBe(401);
  });
});
