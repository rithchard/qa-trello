/**
 * Precondición:
 * Debe existir el tablero "Tablero-1" en la cuenta del usuario de prueba.
 * URL esperada del tablero: https://trello.com/b/AbdfaSLw/tablero-1
 */

import { test, expect } from '@playwright/test';
import { users } from '../../fixtures/users';


test('TC-UI-01 – Crear tarjeta en UI Trello', async ({ page }) => {
    // --- Configuración inicial ---
    // Maximizar ventana para evitar problemas de visualización
    await page.setViewportSize({ width: 1920, height: 1080 });

    // --- Login ---
    await page.goto('https://trello.com/login');
    // data-testid="username"
    await page.fill('[data-testid="username"]', users.user1.email);
    // data-testid="login-submit-idf-testid"
    await page.click('[data-testid="login-submit-idf-testid"]');

    await page.fill('[data-testid="password"]', users.user1.password);

    // data-testid="login-submit-idf-testid"
    await page.click('[data-testid="login-submit-idf-testid"]');

    // --- Navegación al tablero ---
    // wait
    await page.waitForTimeout(5000);
    // goto https://trello.com/u/edgarhuanapa/boards
    await page.goto('https://trello.com/b/AbdfaSLw/tablero-1');
    await page.waitForTimeout(5000);

    // --- Estado inicial: contar tarjetas ---
    // obtener todas las tarjetas individuales antes de crear una nueva
    const cardsBefore = await page.locator('[data-testid="card-done-state"]');
    const countBefore = await cardsBefore.count();
    console.log('Número de tarjetas antes de crear una nueva:', countBefore);

    // --- Crear tarjeta con título único ---
    // Generar texto único para la tarjeta
    const randomNumber = Math.floor(Math.random() * 100000);
    const cardTitle = `Tarjeta de prueba ${randomNumber}`;

    await page.click('[data-testid="list-add-card-button"]');
    await page.fill('[data-testid="list-card-composer-textarea"]', cardTitle);
    await page.click('[data-testid="list-card-composer-add-card-button"]');

    // --- Esperar creación y contar tarjetas ---
    // esperar a que la tarjeta se cree
    await page.waitForTimeout(5000);

    // obtener todas las tarjetas individuales después de crear la nueva
    const cardsAfter = await page.locator('[data-testid="card-done-state"]');
    const countAfter = await cardsAfter.count();
    console.log('Número de tarjetas después de crear una nueva:', countAfter);

    // --- Validaciones ---
    // Comprobar que el número de tarjetas aumentó en 1
    expect(countAfter).toBe(countBefore + 1);

    // Comprobar que la última tarjeta contiene el texto generado
    const lastCard = cardsAfter.nth(countAfter - 1);
    const lastCardText = await lastCard.textContent();
    expect(lastCardText).toContain(cardTitle);
    console.log('Última tarjeta creada:', lastCardText);
});
