import { applicantLoginPage,deskUserLoginPage, applicantLogoutPage } from "../../../pages/login"
import {contractorRenewAddForm, contractorRenewEditSubmitFormOpen, technicalOfficerAssistantEngineerStep1, deputyChiefEngineerStep2, chiefEngineerStep3, chiefEngineerStep4, chiefEngineerStep5, certificateButtonCheck, viewBladeSectionsCheck} from "../../../pages/contractorRegistration/contractorRegistrationRenewModule/contractorRenewEditForm"

describe('Cypress Automation for Contractor Renew Edit Form', () => {
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

    it('should execute complete contractor new workflow', () => 
    {
        // Step 0: Applicant registration
        applicantLoginPage();
        contractorRenewAddForm();
        applicantLogoutPage();
    })

    it('should execute open edit blade and complete for payment', () => 
    {
        // Step 0: Applicant registration
        applicantLoginPage();
        contractorRenewEditSubmitFormOpen();
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

    it('should execute chiefEngineer Step4 desk user processing', () => 
    {
        // Step 4: Desk user processing
        applicantLoginPage();
        chiefEngineerStep4();
        applicantLogoutPage();

    })

    it('should execute chiefEngineer Step5 final approval', () => 
    {    
        // Step 5: Final approval
        deskUserLoginPage();
        chiefEngineerStep5();
        applicantLogoutPage();

    })

    it('should check certificate button visibility after approval', () => 
    {
        // step 6: Check certificate button visibility
        applicantLoginPage();
        certificateButtonCheck();
        applicantLogoutPage();
    })

    it('should check view blade sections', () => 
    {
        // step 7: Check view blade sections
        applicantLoginPage();
        viewBladeSectionsCheck();
        applicantLogoutPage();
    })

})