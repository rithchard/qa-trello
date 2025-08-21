import { test, expect, request } from '@playwright/test';

import { credentials } from '../../fixtures/credentials';

// Precondiciones:
// - Usuario con API Key y Token válidos.
// - ID de lista de Trello válida.
// - Acceso a documentación: Trello API Actions.

const API_KEY = credentials.API_KEY;
const TOKEN = credentials.TOKEN;
const ID_LIST = credentials.ID_LIST;

// Precondiciones:
// - Usuario con API Key y Token válidos.
// - ID de lista válida (usar variable de entorno TRELLO_ID_LIST).


test('TC-API-02 - Autenticación obligatoria en API Trello (OWASP A01)', async ({ request }) => {
    const cardName = `Tarjeta API autenticación ${Math.floor(Math.random() * 100000)}`;

    // 1. Sin credenciales
    const responseNoCreds = await request.post('https://api.trello.com/1/cards', {
        form: {
            idList: ID_LIST,
            name: cardName
        },
        headers: {
            'Accept': 'application/json'
        }
    });

    console.log('Respuesta sin credenciales:', await responseNoCreds.text());
    expect(responseNoCreds.status()).toBe(401);

    // 2. Con credenciales inválidas
    const responseInvalidCreds = await request.post('https://api.trello.com/1/cards', {
        form: {
            idList: ID_LIST,
            name: cardName,
            key: '12345',
            token: 'abcde'
        },
        headers: {
            'Accept': 'application/json'
        }
    });

    console.log('Respuesta con credenciales inválidas:', await responseInvalidCreds.text());
    expect([401, 403]).toContain(responseInvalidCreds.status());
});
