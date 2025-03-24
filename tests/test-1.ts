import { test, expect } from '@playwright/test';

test('Проверка навигации по основным разделам меню на сайте Playwright', async ({ page }) => {
  // Шаг 1: Открыть главную страницу Playwright.
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveURL('https://playwright.dev/');
  await expect(page.title()).resolves.toMatch('Playwright');

  // Шаг 2: Нажать на раздел "Docs".
  const docsLink = page.locator('text=Docs');
  await docsLink.click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  await expect(page.title()).resolves.toMatch('Introduction | Playwright');

  // Шаг 3: Нажать на раздел "API".
  const apiLink = page.locator('text=API');
  await apiLink.click();
  await expect(page).toHaveURL('https://playwright.dev/docs/api/');
  await expect(page.title()).resolves.toMatch('API | Playwright');

  // Шаг 4: Нажать на раздел "Examples".
  const examplesLink = page.locator('text=Examples');
  await examplesLink.click();
  await expect(page).toHaveURL('https://playwright.dev/docs/examples');
  await expect(page.title()).resolves.toMatch('Examples | Playwright');

  // Шаг 5: Вернуться на главную страницу.
  const homeLink = page.locator('text=Home');
  await homeLink.click();
  await expect(page).toHaveURL('https://playwright.dev/');
  await expect(page.title()).resolves.toMatch('Playwright');
});