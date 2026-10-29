# QA Automation with Playwright: Starter Project

This is a starter project for learning test automation with [Playwright](https://playwright.dev) and TypeScript.
The tests run against **[Sauce Demo](https://www.saucedemo.com)**, a public website built for practising testing.

---

## 1. Prerequisites

| Tool | Version | Check with |
|------|---------|-----------|
| [Node.js](https://nodejs.org) | 18 or newer (LTS recommended) | `node --version` |
| [VS Code](https://code.visualstudio.com) | latest | |
| VS Code extension: **Playwright Test for VSCode** (by Microsoft) | latest | |

## 2. Installation

Open a terminal in this folder and run:

```bash
npm install                  # install project dependencies
npx playwright install       # download the browsers (Chromium, Firefox, WebKit)
```

Optional: copy `.env.example` to `.env` if you want to change the URL or users.

## 3. Running tests

| Command | What it does |
|---------|--------------|
| `npm test` | Run all tests in all browsers (headless) |
| `npm run test:chrome` | Run tests in Chromium only (faster) |
| `npm run test:headed` | Run tests with the browser window visible |
| `npm run test:ui` | Open Playwright **UI Mode** (best for learning) |
| `npm run test:debug` | Run step-by-step with the Playwright Inspector |
| `npm run report` | Open the HTML report of the last run |
| `npm run codegen` | Record your clicks and generate test code |

Run a single file or a single test:

```bash
npx playwright test tests/02-login
npx playwright test -g "locked out"
```

## 4. Project structure

```
QA-Automation/
├── playwright.config.ts     # global settings: baseURL, browsers, timeouts, reports
├── pages/                   # Page Objects: locators + actions for each page
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── fixtures.ts          # custom fixtures that give tests ready-made page objects
│   ├── 01-basics/           # Lesson 1: raw Playwright API (goto, locators, expect)
│   ├── 02-login/            # Lesson 2: Page Object Model + data-driven tests
│   └── 03-shopping/         # Lesson 3: end-to-end flow across several pages
└── utils/
    └── testData.ts          # users, passwords, and other test data
```

## 5. Key concepts

- **Locator**: how you find an element. Prefer `getByRole`, `getByText`, `getByLabel`, and `getByTestId` over CSS/XPath.
- **Action**: `click()`, `fill()`, `selectOption()`, `check()` ...
- **Assertion**: `expect(locator).toBeVisible()`, `toHaveText()`, `toHaveURL()` ... Assertions wait and retry automatically.
- **Hooks**: `test.beforeEach` / `test.afterEach` run code before or after every test.
- **Page Object Model (POM)**: one class per page that holds its locators and actions, so tests stay short and readable.
- **Fixtures**: Playwright's way of giving each test what it needs (`page`, `loginPage`, ...).

## 6. Exercises

1. **Lesson 1:** Write a test that checks the "Login" button has the text `Login`.
2. **Lesson 2:** Add a test for `problem_user` and check that it can log in.
3. **Lesson 2:** Add a `logout()` method to a new `MenuPage` page object and test logging out.
4. **Lesson 3:** Test sorting by name Z → A (`'za'`).
5. **Lesson 3:** Add two items to the cart, remove one, and check the badge shows `1`.
6. **Lesson 3:** Check that checkout with an empty first name shows `First Name is required`.
7. **Bonus:** Use `npm run codegen` to record a flow, then refactor it into page objects.

## 7. Useful links

- Docs: https://playwright.dev/docs/intro
- Locators: https://playwright.dev/docs/locators
- Assertions: https://playwright.dev/docs/test-assertions
- Best practices: https://playwright.dev/docs/best-practices
# Mirkam-QA-Automation
