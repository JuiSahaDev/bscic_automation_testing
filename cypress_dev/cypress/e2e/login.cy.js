import { applicantLoginPage, DeskUserLoginPage, applicantLogoutPage } from "../pages/login"

describe('Cypress Automation for Login', () => {
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
        
        cy.visit('https://dev-bscic.oss.net.bd/')
        cy.wait(2000)
    })

    it('should execute applicant login and logout', () => 
    {
        applicantLoginPage();
        applicantLogoutPage();
    })

    it('should execute desk user login and logout', () => 
    {
        DeskUserLoginPage();
        applicantLogoutPage();
    })

})