import { test, expect } from '@playwright/test';

test('Проверка формы обратной связи на сайте Playwright', async ({ page }) => {
    await test.step('Шаг 1: Открыть главную страницу', async () => {
        await page.goto('https://playwright.dev');
    });

    await test.step('Шаг 2: Перейти на страницу "Contact"', async () => {
        const contactLink = page.locator('text=Contact'); 
        await contactLink.click(); 
        await expect(page).toHaveURL(/.*contact/); 
        await expect(page).toHaveTitle(/Contact | Playwright/); 
    });

    await test.step('Шаг 3: Проверить отображение формы обратной связи', async () => {
        const form = page.locator('form'); 
        await expect(form).toBeVisible(); 

        const nameField = page.locator('input[name="name"]'); 
        const emailField = page.locator('input[name="email"]'); 
        const messageField = page.locator('textarea[name="message"]'); 
        const submitButton = page.locator('button[type="submit"]'); 

        await expect(nameField).toBeVisible(); 
        await expect(emailField).toBeVisible(); 
        await expect(messageField).toBeVisible(); 
        await expect(submitButton).toBeVisible(); 
    });


    await test.step('Шаг 4: Заполнить поле "Name"', async () => {
        const nameField = page.locator('input[name="name"]');
        await nameField.fill('John Doe'); 
        await expect(nameField).toHaveValue('John Doe'); 
    });

    await test.step('Шаг 5: Ввести корректный email', async () => {
        const emailField = page.locator('input[name="email"]');
        await emailField.fill('john.doe@example.com'); 
        await expect(emailField).toHaveValue('john.doe@example.com'); 
    });

    await test.step('Шаг 6: Ввести текст сообщения', async () => {
        const messageField = page.locator('textarea[name="message"]');
        await messageField.fill('This is a test message.'); 
        await expect(messageField).toHaveValue('This is a test message.'); 
    });

    await test.step('Шаг 7: Нажать на кнопку "Submit"', async () => {
        const submitButton = page.locator('button[type="submit"]');
        await submitButton.click(); 
        await expect(page.locator('.success-message')).toBeVisible(); 
        await expect(page.locator('.success-message')).toHaveText('Thank you for your feedback!'); 
    });

    