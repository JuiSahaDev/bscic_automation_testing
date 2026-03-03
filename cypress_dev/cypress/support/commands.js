import 'cypress-xpath';
import 'cypress-file-upload';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Highlight element with red border before interaction
Cypress.Commands.overwrite('click', (originalFn, subject, ...args) => {
    const element = Cypress.$(subject)
    const originalBorder = element.css('border')
    const originalOutline = element.css('outline')
    const originalBoxShadow = element.css('box-shadow')
    const originalBackground = element.css('background-color')
    
    element.css('border', '3px solid red')
    element.css('outline', '3px solid red')
    element.css('box-shadow', '0 0 0 5px rgba(255, 0, 0, 0.3)')
    element.css('background-color', 'rgba(255, 0, 0, 0.1)')
    
    setTimeout(() => {
        element.css('border', originalBorder)
        element.css('outline', originalOutline)
        element.css('box-shadow', originalBoxShadow)
        element.css('background-color', originalBackground)
    }, 1000)
    
    return originalFn(subject, ...args)
})

Cypress.Commands.overwrite('type', (originalFn, subject, text, ...args) => {
    const element = Cypress.$(subject)
    const originalBorder = element.css('border')
    const originalOutline = element.css('outline')
    const originalBoxShadow = element.css('box-shadow')
    const originalBackground = element.css('background-color')
    
    element.css('border', '3px solid red')
    element.css('outline', '3px solid red')
    element.css('box-shadow', '0 0 0 5px rgba(255, 0, 0, 0.3)')
    element.css('background-color', 'rgba(255, 0, 0, 0.1)')
    
    setTimeout(() => {
        element.css('border', originalBorder)
        element.css('outline', originalOutline)
        element.css('box-shadow', originalBoxShadow)
        element.css('background-color', originalBackground)
    }, 1000)
    
    return originalFn(subject, text, ...args)
})

Cypress.Commands.overwrite('select', (originalFn, subject, valueOrText, ...args) => {
    const element = Cypress.$(subject)
    const originalBorder = element.css('border')
    const originalOutline = element.css('outline')
    const originalBoxShadow = element.css('box-shadow')
    const originalBackground = element.css('background-color')
    
    element.css('border', '3px solid red')
    element.css('outline', '3px solid red')
    element.css('box-shadow', '0 0 0 5px rgba(255, 0, 0, 0.3)')
    element.css('background-color', 'rgba(255, 0, 0, 0.1)')
    
    setTimeout(() => {
        element.css('border', originalBorder)
        element.css('outline', originalOutline)
        element.css('box-shadow', originalBoxShadow)
        element.css('background-color', originalBackground)
    }, 1000)
    
    return originalFn(subject, valueOrText, ...args)
})