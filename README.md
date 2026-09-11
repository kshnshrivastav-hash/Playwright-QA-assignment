##Playwright QA Automation Assignment

A Playwright and TypeScript automation project created as part of a QA automation assignment.

The project focuses on handling common real-world UI automation challenges such as dynamic elements, delayed actions, lazy-loaded content, conditional rendering, and modal interactions.

##Tech Stack
Playwright
TypeScript
Node.js
Git & GitHub

#Test Scenarios

The project contains automated tests for:

##TestScenario

delayed-button.spec.ts
Handling delayed UI elements
lazy-list.spec.ts
Validating dynamically loaded list content
dynamic-ids.spec.ts
Handling dynamic element IDs
conditional-render.spec.ts
Handling conditionally rendered elements
modal-flow.spec.ts
Automating modal interactions

##Project Structure

playwright-qa-assignment/
│
├── tests/
│   ├── conditional-render.spec.ts
│   ├── delayed-button.spec.ts
│   ├── dynamic-ids.spec.ts
│   ├── lazy-list.spec.ts
│   └── modal-flow.spec.ts
│
├── Tripore_AI_QA_Assignment_.xlsx
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md


##Automation Approach

The tests demonstrate practical Playwright techniques including:

Reliable element locators
Auto-waiting
Dynamic element handling
Conditional element validation
Lazy-loaded content handling
Modal interaction
Assertions
Test isolation
Playwright test runner

##Installation

npm ci
npx playwright install


##Run Tests

Run the complete test suite:
npx playwright test
Run in headed mode:
npx playwright test --headed
Run a specific test:
npx playwright test tests/dynamic-ids.spec.ts

Open the HTML report:
npx playwright show-report

##Purpose

This project demonstrates practical experience in identifying automation challenges and implementing reliable Playwright-based solutions rather than relying only on basic UI automation.

##Author

Kishan Srivastav
QA Automation Engineer



Skills: Playwright | TypeScript | JavaScript | API Testing | SQL | Manual Testing
