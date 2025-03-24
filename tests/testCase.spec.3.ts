import { test, expect } from '@playwright/test';

test('Проверка переключения между светлой и темной темами на сайте Playwright', async ({ page }) => {

    await test.step('Шаг 1: Открыть главную страницу', async () => {
        await page.goto('https://playwright.dev');
        await expect(page).toHaveTitle(/Playwright/); 
    });

    await test.step('Шаг 2: Проверить текущую тему (светлая)', async () => {
        const bodyBackgroundColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
         
        expect(bodyBackgroundColor).toBe('rgb(255, 255, 255)'); 
        expect(bodyColor).toBe('rgb(0, 0, 0)'); 
    });

    await test.step('Шаг 3: Переключиться на темную тему', async () => {
        const themeToggleButton = page.locator('button[aria-label="Toggle Theme"]'); 
        await themeToggleButton.click(); 

        const bodyBackgroundColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
        
        expect(bodyBackgroundColor).toBe('rgb(0, 0, 0)');
        expect(bodyColor).toBe('rgb(255, 255, 255)'); 
    });

    await test.step('Шаг 4: Проверить элементы на темной теме', async () => {
        const header = page.locator('h1'); 
        await expect(header).toHaveCSS('color', 'rgb(255, 255, 255)'); 
    });

    await test.step('Шаг 5: Переключиться обратно на светлую тему', async () => {
        const themeToggleButton = page.locator('button[aria-label="Toggle Theme"]');
        await themeToggleButton.click();

        const bodyBackgroundColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
        
        expect(bodyBackgroundColor).toBe('rgb(255, 255, 255)'); 
        expect(bodyColor).toBe('rgb(0, 0, 0)'); 
    });

    await test.step('Шаг 6: Проверить элементы на светлой теме', async () => {
        const header = page.locator('h1');
        await expect(header).toHaveCSS('color', 'rgb(0, 0, 0)'); 