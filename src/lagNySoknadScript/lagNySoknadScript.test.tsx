import puppeteer from "puppeteer";

describe("Lag ny søknad automatisk", () => {
  test("FUNKER DETTE!?!?!?", async () => {
    const browser = await puppeteer.launch({
      headless: "new",
      product: "firefox",
      // `headless: true` (default) enables old Headless;
      // `headless: 'new'` enables new Headless;
      // `headless: false` enables “headful” mode.
    });

    const page = await browser.newPage();
    await page.goto("https://developer.chrome.com/");

    // …

    // await browser.close();
  });
});
