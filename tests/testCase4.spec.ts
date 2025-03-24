import { test, expect } from '@playwright/test';

test('Проверка корректного отображения ссылок в футере на сайте Playwright', async ({ page }) => {

    await test.step('Шаг 1: Открыть главную страницу', async () => {
        await page.goto('https://playwright.dev');
        await expect(page).toHaveTitle(/Playwright/); 
    });

    await test.step('Шаг 2: Найти блоки футера', async () => {
        const learnBlock = page.locator('text=Learn'); 
        const communityBlock = page.locator('text=Community'); 
        const moreBlock = page.locator('text=More');

        await expect(learnBlock).toBeVisible();
        await expect(communityBlock).toBeVisible(); 
        await expect(moreBlock).toBeVisible(); 
    });

    
    await test.step('Шаг 3: Проверить ссылки в блоке "Learn"', async () => {
        const learnLinks = await page.locator('text=Learn >> .. >> ul li a'); 
        const expectedLearnLinks = [
            { text: 'Getting Started', href: '/docs/intro' },
            { text: 'API Reference', href: '/docs/api/class-playwright' },
            { text: 'Playwright GitHub', href: 'https://github.com/microsoft/playwright' },
        ];

        for (const link of expectedLearnLinks) {
            const foundLink = learnLinks.locator(`text=${link.text}`);
            await expect(foundLink).toHaveAttribute('href', link.href); 
        }
    });

    await test.step('Шаг 4: Проверить ссылки в блоке "Community"', async () => {
        const communityLinks = await page.locator('text=Community >> .. >> ul li a'); 
        const expectedCommunityLinks = [
            { text: 'Join our Discord', href: 'https://discord.com/invite/playwright' },
            { text: 'Twitter', href: 'https://twitter.com/playwright' },
            { text: 'GitHub discussions', href: 'https://github.com/microsoft/playwright/discussions' },
        ];

        for (const link of expectedCommunityLinks) {
            const foundLink = communityLinks.locator(`text=${link.text}`);
            await expect(foundLink).toHaveAttribute('href', link.href);
        }
    });

    await test.step('Шаг 5: Проверить ссылки в блоке "More"', async () => {
        const moreLinks = await page.locator('text=More >> .. >> ul li a'); 
        const expectedMoreLinks = [
            { text: 'Changelog', href: '/docs/changelog' },
            { text: 'About', href: '/docs/about' }
        ];

        for (const link of expectedMoreLinks) {
            const foundLink = moreLinks.locator(`text=${link.text}`);
            await expect(foundLink).toHaveAttribute('href', link.href); 
        }
    });
});