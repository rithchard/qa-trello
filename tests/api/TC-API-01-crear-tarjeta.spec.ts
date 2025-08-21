import { test, expect, request } from '@playwright/test';
import { credentials } from '../../fixtures/credentials';

// Precondiciones:
// - Usuario con API Key y Token válidos.
// - ID de lista de Trello válida.
// - Acceso a documentación: Trello API Actions.

const API_KEY = credentials.API_KEY;
const TOKEN = credentials.TOKEN;
const ID_LIST = credentials.ID_LIST;


test('TC-API-01 - Crear tarjeta vía API Trello', async ({ request }) => {
    // Datos de prueba
    const cardName = `Tarjeta API automatizada ${Math.floor(Math.random() * 100000)}`;

    // Paso: Enviar request POST para crear la tarjeta
    const response = await request.post('https://api.trello.com/1/cards', {
        form: {
            idList: ID_LIST,
            name: cardName,
            key: API_KEY,
            token: TOKEN
        },
        headers: {
            'Accept': 'application/json'
        }
    });

    // Verificar respuesta de la API
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);

    const json = await response.json();
    // console.log('Respuesta JSON:', JSON.stringify(json, null, 2));

    // Validar que la tarjeta fue creada con el nombre correcto
    expect(json.name).toBe(cardName);
    expect(json.idList).toBe(ID_LIST);

    // Resultado obtenido
    // console.log('Estado:', response.ok() ? 'Passed' : 'Failed');
});
