# bscic_automation_testing
Automation testing project using Cypress for BSCIC projects.


## Project Structure & Task Status

This project uses Cypress for end-to-end automation testing of BSCIC modules. Below is an overview of the main folders and the status of each module:

### Folder Structure

- `cypress_dev/` and `cypress_uat/`: Separate environments for development and UAT testing
	- `cypress/`
		- `e2e/`: Test cases for different modules
		- `fixtures/`: Test data files
		- `pages/`: Page Object Model files for each module
		- `support/`: Custom commands and support files

### Main Modules & Status

#### Contractor Registration
- [x] New Registration
- [x] Registration Amendment
- [x] Registration Renewal
- [x] Re-Registration

#### Industrial Registration
- [x] New Registration
- [x] Registration Amendment
- [x] Registration Cancellation
- [x] Renewal
- [x] Re-Registration

#### Sub-Contracting Enrollment
- [x] New Enrollment
- [x] Renewal
- [x] Re-Registration

#### Login
- [x] Login Test

#### Reporting & Video
- [x] Test video and screenshot capture enabled
- [x] Report generation (JUnit/Mochawesome)

> **Legend:**
> - [x] = Completed
> - [ ] = Pending
> - [~] = In Progress

---
For details on running tests, generating reports, or contributing, see the commands section above or contact the maintainer.

## Main Cypress Commands Used & Why

### 1. Cypress Test Commands
- `cy.get()`, `cy.contains()`, `cy.visit()`, `cy.type()`, `cy.click()`, `cy.wait()`, `cy.should()`, `cy.select()`  
	**Purpose:** Interact with web elements, navigate, fill forms, click buttons, wait for elements, and make assertions.

### 2. Test Structure
- `describe()`, `it()`, `beforeEach()`, `afterEach()`  
	**Purpose:** Organize test suites/cases and run setup/teardown code before or after tests.

### 3. Custom Commands & Plugins
- `Cypress.Commands.add()`, `Cypress.Commands.overwrite()`  
	**Purpose:** Add or modify custom commands for reusable actions (e.g., login, file upload).
- `import 'cypress-xpath'`, `import 'cypress-file-upload'`  
	**Purpose:** Use plugins for XPath selectors and file upload features.

### 4. Configuration & Reporting
- `require('cypress')`, `require('cypress-mochawesome-reporter/plugin')`  
	**Purpose:** Cypress configuration and enabling advanced HTML reporting.
- `import 'cypress-mochawesome-reporter/register'`  
	**Purpose:** Register Mochawesome reporter for generating test reports.

### 5. Error Handling
- `Cypress.on('uncaught:exception', ...)`  
	**Purpose:** Handle or ignore unexpected errors during test runs.

### 6. NPM Scripts
- `npm install`, `npx cypress open`, `npx cypress run`  
	**Purpose:** Install dependencies, open Cypress GUI, and run tests in headless mode.

---
These commands and patterns are used throughout the project to ensure robust, maintainable, and automated testing for all BSCIC modules.
