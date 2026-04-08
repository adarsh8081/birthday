import { expect, test } from "@playwright/test";

test.describe("Ishika birthday experience", () => {
  test("opens with the candle and transitions to the celebration", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => sessionStorage.removeItem("ishika-birthday-intro"));
    await page.reload();

    await expect(page.getByRole("button", { name: "Blow out the candle" })).toBeVisible();
    await page.getByRole("button", { name: "Blow out the candle" }).click();
    await expect(page.getByRole("heading", { name: /A brighter,/i })).toBeVisible({
      timeout: 5000,
    });

    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#wishes")).toBeVisible();
    await expect(page.locator("#gallery")).toBeVisible();
    await expect(page.locator("#videos")).toBeVisible();
    await expect(page.locator("#collection")).toBeVisible();
    await expect(page.locator("#finale")).toBeVisible();
  });

  test("legacy route redirects land on the new anchors", async ({ page }) => {
    await page.goto("/wishes");
    await expect(page).toHaveURL(/#wishes$/);

    await page.goto("/gallery");
    await expect(page).toHaveURL(/#gallery$/);

    await page.goto("/journey");
    await expect(page).toHaveURL(/#gallery$/);

    await page.goto("/surprise");
    await expect(page).toHaveURL(/#finale$/);
  });

  test("memories route redirects directly to collection", async ({ page }) => {
    await page.goto("/memories");
    await expect(page).toHaveURL(/\/collection$/);
  });

  test("collection gallery lightbox and video shelf work", async ({ page }) => {
    await page.goto("/collection");

    await page.locator("[data-testid='gallery-card-1']").click();
    await expect(page.getByRole("button", { name: "Close lightbox" })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Close lightbox" })).toHaveCount(0);

    await page.locator("[data-testid='video-card-1']").click();
    await page.getByRole("button", { name: /Play/i }).click();
    await expect(page.locator("video")).toBeVisible();
  });
});
