import { applicantLoginPage, deskUserLoginPage, applicantLogoutPage } from "../pages/login"

describe('Cypress Automation Testing for Login and logout Page', () => {
    beforeEach(() => {
        // Handle uncaught exceptions from cross-origin redirects
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Ignore the 'baseUrl' error from cross-origin SSO redirect
            if (err.message.includes('baseUrl')) {
                return false
            }
            // Let other errors fail the test
            return true
        })

        // Clear all session data before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
        
        cy.visit('https://uat.ossbscic.gov.bd/', { failOnStatusCode: false })
        cy.wait(3000)
        
        // Wait for page to fully load
        cy.get('body', { timeout: 15000 }).should('be.visible')
    })

    it('should execute applicant login and logout', () => 
    {
        applicantLoginPage();
        applicantLogoutPage();
    })

    it('should execute desk user login and logout', () => 
    {
        deskUserLoginPage();
        applicantLogoutPage();
    })

})