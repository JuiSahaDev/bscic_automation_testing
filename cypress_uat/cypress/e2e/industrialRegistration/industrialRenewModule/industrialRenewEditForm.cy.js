// Industrial Renew Test Script for applicant and Desk User
import { applicantLoginPage, deskUserLoginPage, applicantLogoutPage } from "../../../pages/login"
import { industrialRenewAddForm, industrialRenewEditSubmitFormOpen, extensionOfficer9thGradeOrEquivalentStep1, assistantGeneralManager6thGradeOrEquivalentStep2, applicantOrInvestorStep3, assistantGeneralManager6thGradeOrEquivalentStep4, certificateButtonCheck, viewBladeSectionsCheck } from "../../../pages/industrialRegistration/industrialRenewModule/industrialRenewAddForm"

describe('Cypress Automation for Industrial Renew Edit Blade Testing', () => {
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

        cy.visit('https://uat.ossbscic.gov.bd/')
    })

    it('should execute open industrial new form', () => 
    {
        // Step 0: Applicant registration
        applicantLoginPage();
        industrialRenewAddForm();
        applicantLogoutPage();

    })

    it('should execute open edit blade and complete for payment', () => 
    {
        // Step 0: Applicant registration
        applicantLoginPage();
        industrialRenewEditSubmitFormOpen();
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
        assistantGeneralManager6thGradeOrEquivalentStep2();
        applicantLogoutPage();

    })

    it('should execute ApplicantOrInvestor Step3 government payment', () => 
    {
        // Step 3: Government payment
        applicantLoginPage();
        applicantOrInvestorStep3();
        applicantLogoutPage();
    })

    it('should execute AssistantGeneralManager6thGradeOrEquivalent Step4 final approval', () => 
    {

        // step 4: Final processing by desk user
        deskUserLoginPage();    
        assistantGeneralManager6thGradeOrEquivalentStep4();
        applicantLogoutPage();
    })

    it('should check certificate button visibility after approval', () => 
    {
        // step 5: Check certificate button visibility
        applicantLoginPage();
        certificateButtonCheck();
        applicantLogoutPage();
    })

    it('should check view blade all sections', () => 
    {
        // step 6: Check view blade sections
        applicantLoginPage();
        viewBladeSectionsCheck();
        applicantLogoutPage();
    })
    
})

