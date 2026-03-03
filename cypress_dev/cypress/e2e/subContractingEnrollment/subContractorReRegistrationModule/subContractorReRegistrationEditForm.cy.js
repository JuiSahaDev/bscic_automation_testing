import { applicantLoginPage,deskUserLoginPage, applicantLogoutPage } from "../../../pages/login"
import {subContractorReRegistrationAddForm, subContractorReRegistrationEditSubmitFormOpen, deputyGeneralManagerStep1, assistantEngineerOrExecutiveOfficerStep2, deputyGeneralManagerFinalStep3, certificateButtonCheck, viewBladeSectionsCheck} from "../../../pages/subContractingEnrollment/subContractorReRegistrationModule/subContractorReRegistrationEditForm"

describe('Cypress Automation for Sub Contractor Re-Registration Edit Form', () => {
    beforeEach(() => {
        // Handle uncaught exceptions from cross-origin redirects
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Ignore the 'baseUrl' error from cross-origin SSO redirect
            if (err.message.includes('baseUrl')) {
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

    it('should execute sub-contractor registration steps', () => 
    {
        // Step 0: Applicant registration 
        applicantLoginPage();
        subContractorReRegistrationAddForm();
        applicantLogoutPage();
    })

    it('should execute open edit blade and complete for payment', () => 
    {
        // Step 0.1: Applicant registration and open edit form for payment
        applicantLoginPage();
        subContractorReRegistrationEditSubmitFormOpen();
        applicantLogoutPage();

    })
    
    it('should execute deputyGeneralManager Step1 desk user processing', () => 
    {    
        // Step 1: Desk user processing
        deskUserLoginPage();
        deputyGeneralManagerStep1();
        applicantLogoutPage();

    })

    it('should execute assistantEngineerOrExecutiveOfficer Step2 desk user processing', () => 
    {    
        // Step 2: Desk user processing
        deskUserLoginPage();
        assistantEngineerOrExecutiveOfficerStep2();
        applicantLogoutPage();

    })

    it('should execute deputyGeneralManager Step3 desk user processing', () => 
    {    
        // Step 3: Desk user processing
        deskUserLoginPage();
        deputyGeneralManagerFinalStep3();
        applicantLogoutPage();

    })

    it('should check certificate button visibility after approval', () => 
    {
        // step 4: Check certificate button visibility
        applicantLoginPage();
        certificateButtonCheck();
        applicantLogoutPage();
    })

    it('should check view blade sections', () => 
    {
        // step 5: Check view blade sections
        applicantLoginPage();
        viewBladeSectionsCheck();
        applicantLogoutPage();
    })
})