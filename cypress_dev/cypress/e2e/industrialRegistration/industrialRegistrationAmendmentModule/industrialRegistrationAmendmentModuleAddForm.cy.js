// Industrial Amendment Test Script for applicant and Desk User
import { applicantLoginPage, deskUserLoginPage, applicantLogoutPage } from "../../../pages/login"
import { industrialAmendmentAddForm, extensionOfficer9thGradeOrEquivalentStep1, assistantGeneralManager6thGradeOrEquivalentFinalStep, certificateButtonCheck, viewBladeSectionsCheck } from "../../../pages/industrialRegistration/industrialRegistrationAmendmentModule/industrialRegistrationAmendmentModuleAddForm"

describe('Cypress Automation for Industrial Amendment Add Blade Testing', () => {
    beforeEach(() => {
        // Handle uncaught exceptions from cross-origin redirects
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Ignore the 'baseUrl' and 'Identifier' errors from cross-origin SSO redirect
            if (err.message.includes('baseUrl') || err.message.includes('Identifier')) {
                return false
            }
            // Ignore addEventListener errors from application
            if (err.message.includes('addEventListener')) {
                return false
            }
            // Ignore null/undefined errors that may come from the app
            if (err.message.includes('Cannot read properties of null')) {
                return false
            }
            // Let other errors fail the test
            return true
        })

        cy.visit('https://dev-bscic.oss.net.bd/')
    })

    it('should execute complete industrial new workflow', () => 
    {
        // Step 0: Applicant registration
        applicantLoginPage();
        industrialAmendmentAddForm();
        applicantLogoutPage();

    })

    it('should execute ExtensionOfficer9thGradeOrEquivalent Step1 desk user processing', () => 
    {
        // Step 1: Desk user processing
        deskUserLoginPage();
        extensionOfficer9thGradeOrEquivalentStep1();
        applicantLogoutPage();

    })

    it('should execute AssistantGeneralManager6thGradeOrEquivalent Step2 desk user processing', () => 
    {
        // Step 2: Desk user processing
        deskUserLoginPage();
        assistantGeneralManager6thGradeOrEquivalentFinalStep();
        applicantLogoutPage();

    })

    it('should check certificate button visibility after approval', () => 
    {
        // step 5: Check certificate button visibility
        applicantLoginPage();
        certificateButtonCheck();
        applicantLogoutPage();
    })

    it('should check view blade sections', () => 
    {
        // step 6: Check view blade sections
        applicantLoginPage();
        viewBladeSectionsCheck();
        applicantLogoutPage();
    })

})

