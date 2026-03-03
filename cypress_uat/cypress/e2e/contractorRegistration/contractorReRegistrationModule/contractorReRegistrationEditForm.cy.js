import { applicantLoginPage,deskUserLoginPage, applicantLogoutPage } from "../../../pages/login"
import {contractorReRegistrationAddForm, contractorReRegistrationEditSubmitFormOpen, technicalOfficerAssistantEngineerStep1, deputyChiefEngineerStep2, chiefEngineerStep3, chiefEngineerStep4, chiefEngineerStep5, certificateButtonCheck, viewBladeSectionsCheck} from "../../../pages/contractorRegistration/contractorReRegistrationModule/contractorReRegistrationEditForm"

describe('Cypress Automation for Contractor Re-Registration Edit Form', () => {
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

        cy.visit('https://uat.ossbscic.gov.bd/')
    })

    it('should execute complete contractor re-registration workflow', () => 
    {
        // Step 0: Applicant registration for save_as_draft
        applicantLoginPage();
        contractorReRegistrationAddForm();
        applicantLogoutPage();
    })

    it('should execute open edit blade and complete for payment', () => 
    {
        // Step 0.1: Applicant registration open edit form and submit for payment
        applicantLoginPage();
        contractorReRegistrationEditSubmitFormOpen();
        applicantLogoutPage();

    })

    it('should execute technicalOfficerAssistantEngineer Step1 desk user processing', () => 
    {    
        // Step 1: Desk user processing
        deskUserLoginPage();
        technicalOfficerAssistantEngineerStep1();
        applicantLogoutPage();

    })

    it('should execute deputyChiefEngineer Step2 desk user processing', () => 
    {    
        // Step 2: Desk user processing
        deskUserLoginPage();
        deputyChiefEngineerStep2();
        applicantLogoutPage();

    })

    it('should execute chiefEngineer Step3 desk user processing', () => 
    {    
        // Step 3: Desk user processing
        deskUserLoginPage();
        chiefEngineerStep3();
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