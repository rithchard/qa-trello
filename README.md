# QA Trello - Test Automation

This repository contains automated tests for the Trello application, covering both UI and API tests using Playwright.

## Prerequisites

- **Node.js**: Node.js must be installed (recommended version: >=16.x).
- **npm**: Comes bundled with Node.js.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd qa-trello
   ```

2. Install the required packages and modules:
   ```bash
   npm install
   ```

   This will install all dependencies listed in `package.json`, including Playwright and other required modules.

## Credentials Configuration

### UI Tests

To run UI tests, you need to provide valid user credentials for [trello.com]. These credentials should be set in the file:

- `fixtures/users.ts`

Example:
```typescript
export const users = {
  user1: {
    email: 'your-email@domain.com',
    password: 'your-password',
  }
};
```

### API Tests

To run API tests, you need Trello API access credentials. Set the following values in the file:

- `fixtures/credentials.ts`

Example:
```typescript
export const credentials = {
  API_KEY: 'your-api-key',
  TOKEN: 'your-token',
  ID_LIST: 'your-list-id'
};
```

## Running Tests

### Run All Tests

```bash
npx playwright test --headed --workers=1
```

### Run Only UI Tests

```bash
npx playwright test tests/ui --headed --workers 1
```

### Run Only API Tests

```bash
npx playwright test tests/api --headed --workers 1
```

### Run a Specific Test

```bash
npx playwright test tests/api/TC-API-01-crear-tarjeta.spec.ts
```

Replace the path with the test file you want to execute.

---

## Best Practices

- Keep your credentials secure and do not share them publicly.
- Review and update dependencies regularly.
- Refer to the official [Playwright documentation](https://playwright.dev/) for more configuration and execution options.


