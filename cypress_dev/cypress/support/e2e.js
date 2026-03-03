// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register'

// 🔴 FIX for "Identifier 'baseUrl' has already been declared"
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('baseUrl has already been declared')) {
    return false
  }  // Ignore form submission errors from application code
  if (err.message.includes('Cannot set properties of null')) {
    return false
  }
  if (err.message.includes('Cannot read properties of undefined')) {
    return false
  }
  if (err.message.includes('replaceAll')) {
    return false
  }})

