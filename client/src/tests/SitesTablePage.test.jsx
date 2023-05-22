import "@testing-library/jest-dom";

describe("SitesTablePage", () => {
  it("check protected site read api", async () => {
    const response = await fetch("http://127.0.0.1:3000/site");

    expect(response.status).toBe(401);
  });
});
