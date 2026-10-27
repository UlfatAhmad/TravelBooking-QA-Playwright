# Travel Booking Playwright Automation

A TypeScript Playwright UI automation framework for the public Restful Booker practice application at [automationintesting.online](https://automationintesting.online/). It provides a small Page Object Model, reusable fixtures, synthetic test data, and multi-browser execution.

## Technology stack

- Node.js 20 or later
- TypeScript
- Playwright Test (`@playwright/test`)
- dotenv for environment-based configuration

## Framework architecture

- `playwright.config.ts` configures Chromium, Firefox, and WebKit projects, list/HTML/JUnit reporters, and failure artifacts.
- `config/environment.ts` loads and validates the optional `BASE_URL` from `.env`.
- `pages/` contains the shared base page and Home, Search Results, Hotel Details, and Reservation page objects.
- `fixtures/test-fixtures.ts` provides typed page-object and synthetic booking-data fixtures.
- `test-data/` contains synthetic sample booking data.
- `tests/` contains the UI scenarios and the isolated synthetic-data check.
- `utils/` contains reusable date helpers.
- `docs/unsupported-scenarios.md` documents application workflows that cannot currently be verified.

## Implemented scenarios

The current UI tests check:

1. The hotel homepage, room section, and Single, Double, and Suite room listings.
2. That every room has a booking link pointing to the matching room reservation route.
3. That selecting a room navigates to its reservation URL.
4. That choosing dynamically generated future stay dates updates the booking-link query parameters.

A separate test validates synthetic booking data. Form-level booking, guest validation, and invalid-date-range scenarios are not claimed as covered because the public application does not currently support them reliably; details are in [Unsupported scenarios](./docs/unsupported-scenarios.md).

## Public practice application and reservation safety

The suite targets the public practice application at `https://automationintesting.online/`. Tests do not submit reservation or contact forms and do not create actual bookings. The reservation route has rendered without a form when the room API returns HTTP 500, so tests verify navigation only and do not assume unavailable booking controls.

## Installation

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
```

`.env.example` contains only the public application URL. The local `.env` file is ignored by Git. Set `BASE_URL` there if you need to use another permitted test environment.

Install additional browsers when running their projects:

```powershell
npx playwright install firefox webkit
```

## Running tests

Run Chromium headless (default test script):

```powershell
npm test
```

Run each browser project:

```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run the suite in all configured browsers:

```powershell
npm run test:all-browsers
```

Other useful commands:

```powershell
npm run test:headed
npm run test:ci
npm run typecheck
```

## Reports

Playwright generates:

- A console list reporter.
- An HTML report in `playwright-report/`.
- JUnit XML at `test-results/junit.xml`.

Open the latest HTML report with:

```powershell
npm run report
```

Screenshots, traces, and videos are retained on test failure under `test-results/`. Reports and test artifacts are ignored by Git.

## Planned Jenkins CI/CD integration

The project is prepared for a future Jenkins pipeline through its npm test scripts, CI options, and JUnit XML reporter. A future pipeline can install Node dependencies and Playwright Chromium, run `npm run typecheck` and `npm run test:ci`, then publish JUnit XML and the HTML report. Jenkins is not configured in this repository yet.
