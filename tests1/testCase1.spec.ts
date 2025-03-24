import { test, expect } from '@playwright/test';

test('Модальное окно поиска', async ({ page }) => {
    await test.step('Прекондиция: открыть главную страницу playwright.dev/', async () => {
        await page.goto('https://playwright.dev'); // Убедитесь, что URL правильный
    });

    await test.step('Степ 1: Кликнуть на кнопку "Search"', async () => {
        const searchButton = page.locator('button.DocSearch-Button'); 
        await searchButton.click(); 
    });

    await test.step('Степ 2: Проверить модальное окно поиска', async () => {
        const modal = page.locator('div.DocSearch-Modal');
        await expect(modal).toBeVisible(); // модальное окно открыто

        const searchBar = page.locator('header.DocSearch-SearchBar');
        await expect(searchBar).toBeVisible(); // отображается поле поиска

        const inputSearch = page.locator('input.DocSearch-Input');
        await expect(inputSearch).toHaveValue(''); // поле поиска пустое

        const helperText = page.locator('p.DocSearch-Help');
        await expect(helperText).toBeVisible(); // Показывает подсказку "No recent searches"
    });

    await test.step('Степ 3: Ввести "sample" в поле поиска', async () => {
        const inputSearch = page.locator('input.DocSearch-Input');
        await inputSearch.fill('sample'); // ввод текста
    });

    await test.step('Степ 4: Проверка состояния после ввода текста', async () => {
        const clearButton = page.locator('button.DocSearch-Reset');
        await expect(clearButton).toBeVisible(); // Отображается кнопка очистки

        const contentWrapper = page.locator('div.DocSearch-Dropdown-Container');
        await expect(contentWrapper).toBeVisible(); // Отображается найденный контент

        const seeAllButton = page.locator('section.DocSearch-HitsFooter');
        await expect(seeAllButton).toBeVisible(); // Доступна кнопка "See all ... results"
    });

    await test.step('Степ 5: Нажать на кнопку очистки', async () => {
        const clearButton = page.locator('button.DocSearch-Reset');
        await clearButton.click();
    });

    await test.step('Степ 6: Проверка состояния после очистки поля поиска', async () => {
        const searchBar = page.locator('header.DocSearch-SearchBar');
        await expect(searchBar).toBeVisible(); // отображается поле поиска

        const inputSearch = page.locator('input.DocSearch-Input');
        await expect(inputSearch).toHaveValue(''); // поле поиска пустое

        const clearButton = page.locator('button.DocSearch-Reset');
        await expect(clearButton).toBeHidden(); // кнопка очистки не отображается

        const helperText = page.locator('p.DocSearch-Help');
        await expect(helperText).toBeVisible(); // Показывает подсказку "No recent searches"
    });

    await test.step('Степ 7: Ввести текст "test" в поле поиска', async () => {
        const inputSearch = page.locator('input.DocSearch-Input');
        await inputSearch.fill('test'); // ввод текста
    });

    await test.step('Степ 8: Проверка состояния после нового ввода', async () => {
        const clearButton = page.locator('button.DocSearch-Reset');
        await expect(clearButton).toBeVisible(); // Отображается кнопка очистки

        const contentWrapper = page.locator('div.DocSearch-Dropdown-Container');
        await expect(contentWrapper).toBeVisible(); // Отображается найденный контент

        const seeAllButton = page.locator('section.DocSearch-HitsFooter');