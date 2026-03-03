// step0: Applicant contractor add new registration form filling and save as draft
export const contractorRenewAddForm = () => {
    
    cy.get('.panel-body').eq(1).contains('a', 'আবেদন').click()  // click on ঠিকাদার নিবন্ধন card   
    cy.contains('label.checkbox-inline', 'নবায়ন', { timeout: 20000 }).should('be.visible').first().click() // click "নবায়ন" radio button
    cy.get('#select2-trackingSelect-container', { timeout: 20000 }).should('be.visible').click() // click on dropdown to load options

    // Wait for the dropdown options to load and be visible
    cy.get('.select2-results__option').should('have.length.greaterThan', 1).then(
        $options => {
            // remove first placeholder manually
            const realOptions = $options.slice(1)
            cy.wrap(realOptions.last()).click() // select last option which is the latest application
        }
    )

    cy.contains('a', 'পরবর্তী', { timeout: 20000 }).should('be.visible').click() // পরবর্তী button

    // check texts exist - Section 1: ঠিকাদার নিবন্ধন নবায়ন
    cy.contains('p', 'ঠিকাদার নিবন্ধন নবায়ন', { timeout: 20000 }).scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের পরিচয়').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের নিবন্ধিত ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('span', 'প্রতিষ্ঠানের যোগাযোগের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত ব্যক্তির পরিচয়').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের আর্থিক তথ্যাবলি').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রয়োজনীয় সংযুক্তি').scrollIntoView().should('be.visible')
    cy.contains('p', 'ঘোষণাপত্র').scrollIntoView().should('be.visible')

    // সার্ভিস ফি পেমেন্ট section check
    cy.contains('p', 'সার্ভিস ফি পেমেন্ট').scrollIntoView().should('be.visible')

    //1. সাধারণ তথ্য save_as_draft tab
    cy.get('#save_as_draft').click()
    cy.wait(5000)

}

// step0: Applicant contractor edit registration form filling and submission
export const contractorRenewEditSubmitFormOpen = () => {

     cy.viewport(1920, 1080)

    // click application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).click()

    // click tab
    cy.contains('a[data-toggle="tab"]', 'আবেদনের তালিকা', { timeout: 15000 }).click()

    // ADD THIS
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // then click edit button of first row
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click()

    // Scroll to top after clicking edit button
    cy.scrollTo('top')
    cy.wait(2000)

    // সার্ভিস ফি পেমেন্ট
    cy.get('[id="sfp_contact_address"]', { timeout: 20000 }).should('be.visible').clear().type('Mirpur, Dhaka').should('have.value', 'Mirpur, Dhaka')
    cy.get('[id="submitForm"]').scrollIntoView().should('be.visible').should('be.enabled')
    cy.get('[id="submitForm"]').click() //pay button
    
    // Wait for navigation to payment gateway
    cy.url({ timeout: 20000 }).should('include', 'spgwebuat.sonalibank.com.bd')
    
    // Payment gateway - cross origin
    cy.origin('https://spgwebuat.sonalibank.com.bd', () => {
        // Handle errors inside cy.origin
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('baseUrl') || err.message.includes('Identifier') || err.name === 'SyntaxError') {
                return false
            }
        })
        
        cy.get('[value="Account"]', { timeout: 20000 }).should('be.visible').click()
        cy.get('.swal2-confirm', { timeout: 20000 }).first().should('be.visible').click()
        cy.get('[id="PayAccountNo"]', { timeout: 20000 }).should('be.visible').clear().type('1234567891011')
        cy.get('[id="PayAccountName"]', { timeout: 20000 }).should('be.visible').clear().type('Jahangir Alam')
        cy.get('[id="PayMobile"]', { timeout: 20000 }).should('be.visible').clear().type('11111111111')
        cy.get('[value="ConfirmRequest"]', { timeout: 20000 }).should('be.visible').click()
        cy.get('[id="OTPVal"]', { timeout: 20000 }).should('be.visible').clear().type('123456')
        cy.get('[id="btnConfirm"]', { timeout: 20000 }).should('be.visible').click()
    })

    // Wait for navigation back from payment gateway
    cy.url({ timeout: 30000 }).should('not.include', 'spgwebuat.sonalibank.com.bd')
    cy.url({ timeout: 10000 }).should('include', '/client/contractor-renew/list/')

    // Verify payment success message
    cy.get('.alert-success', { timeout: 15000 })
        .should('be.visible')
        .and('contain', 'Payment submitted successfully')

}

// step1: Process application as technical officer/assistant engineer
export const technicalOfficerAssistantEngineerStep1 = () => {
    cy.viewport(1920, 1080)

    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()

    // Wait until table rows are loaded
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open the first application (Step 1 - কারিগরি কর্মকর্তা/সহকারী প্রকৌশলী)
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })

    // ===============================
    // Step1: কারিগরি কর্মকর্তা/সহকারী প্রকৌশলী → উপ প্রধান প্রকৌশলী
    // ===============================

    cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Recommended')
    cy.get('#is_user', { timeout: 15000 }).should('be.visible').select('rd 1')
    cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()

    // ===============================
    // Observation flow (commented but corrected)
    // ===============================

    // cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Observation')
    // cy.wait(2000)
    // cy.get('#is_user', { timeout: 15000 }).should('be.visible').select('rd 1')
    // cy.wait(2000)
    // cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()
    // cy.wait(3000)

    // ===============================
    // Shortfall flow (commented but corrected)
    // ===============================

    // cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Shortfall')
    // cy.wait(2000)
    // cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()
    // cy.wait(3000)
}

// step2: Process application as Deputy Chief Engineer
export const deputyChiefEngineerStep2 = () => 
{
    // ===============================
    // Step2: উপ প্রধান প্রকৌশলী → প্রধান প্রকৌশলী
    // ===============================

    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)
    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)
    
    // Verified to প্রধান প্রকৌশলী
    cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Verified')
    cy.wait(2000)
    cy.get('#is_user').should('be.visible').select('rd 1')
    cy.wait(2000)
    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)
}

// step3: Process application as Chief Engineer
export const chiefEngineerStep3 = () => 
{
    // ===============================
    // Step3: প্রধান প্রকৌশলী → Applicant (approval for govt payment)
    // ===============================

    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)
    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)
    
    // Approved to Applicant
    cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Approved for payment')
    cy.wait(2000)

    // Additional govt fee input for renewal application
    cy.get('#additional_govt_fee', { timeout: 10000 }).should('be.visible').type('1000')
    cy.wait(2000)

    // Click user for next step
    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)


    // ===============================
    // Rejected flow (commented but corrected)
    // ===============================

    // cy.get('#application_status').should('be.visible').select('Rejected')
    // cy.wait(2000)

    // cy.contains('button', 'Process').should('be.visible').click()
    // cy.wait(3000)

    // ===============================
    // Shortfall to 6th grade (commented but corrected)
    // ===============================

    // cy.get('#application_status').should('be.visible').select('Shortfall')
    // cy.wait(2000)

    // cy.contains('button', 'Process').should('be.visible').click()
    // cy.wait(3000)
}

// step4: Government payment by applicant
export const chiefEngineerStep4 = () => 
{
    
    // click application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).click()

    // click tab
    cy.contains('a[data-toggle="tab"]', 'আবেদনের তালিকা', { timeout: 15000 }).click()

    // ADD THIS
    cy.get('table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.wait(3000);
    // then click open
    cy.get('a.common_batch_update', { timeout: 15000 }).first().click()
    cy.wait(3000);

    cy.get('[id="gfp_contact_address"]', { timeout: 10000 }).should('be.visible').type('Mirpur, Dhaka')
    cy.wait(3000)
    cy.get('[id="submitForm"]').scrollIntoView().should('be.visible').should('be.enabled')
    cy.wait(2000)
    cy.get('[id="submitForm"]').click() //pay button
    
    // Wait for navigation to payment gateway
    cy.url({ timeout: 20000 }).should('include', 'spgwebuat.sonalibank.com.bd')
    cy.wait(3000)
    
    // Payment gateway - cross origin
    cy.origin('https://spgwebuat.sonalibank.com.bd', () => {
        // Handle errors inside cy.origin
        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('baseUrl') || err.message.includes('Identifier') || err.name === 'SyntaxError') {
                return false
            }
        })
        
        // wait for the payment options to load and be visible
        cy.wait(600000) //10 minutes wait for manual payment or test data entry

        cy.get('[value="Account"]', { timeout: 15000 }).should('be.visible').click()
        cy.wait(5000)
        cy.get('.swal2-confirm').first().click()
        cy.wait(5000)
        cy.get('[id="PayAccountNo"]').type('1234567891011')
        cy.wait(3000)
        cy.get('[id="PayAccountName"]').type('Jahangir Alam')
        cy.wait(3000)
        cy.get('[id="PayMobile"]').type('11111111111')
        cy.wait(3000)
        cy.get('[value="ConfirmRequest"]').click()
        cy.wait(3000)
        cy.get('[id="OTPVal"]').type('123456')
        cy.wait(3000)
        cy.get('[id="btnConfirm"]').click()
        cy.wait(5000)
    })
}

// step5: Final approval by authorized user
export const chiefEngineerStep5 = () => 
{
    cy.viewport(1920, 1080)

    // ===============================
    // Step5: প্রধান প্রকৌশলী → Applicant (Sign the registration)
    // ===============================

    // Click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)

    // Wait until table loads
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)

    // Final approval
    cy.get('#application_status').should('be.visible').select('Sign the renew')
    cy.wait(2000)
    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)
}

// step6: Check certificate generation and application download
export const certificateButtonCheck = () => 
{
    // click application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).click()
    cy.wait(3000);

    // click tab
    cy.contains('a[data-toggle="tab"]', 'আবেদনের তালিকা', { timeout: 15000 }).click()

    // ADD THIS
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // then click open
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click()

    // ===============================
    // ADD HERE
    // ===============================

    // wait page load একটু
    cy.wait(3000)

    // check certificate button আছে কিনা
    cy.get('body').then(body => {

        if (body.find('a[title="Certificate"]').length > 0) {
            cy.log('Certificate button found')

            cy.get('a[title="Certificate"]')
              .should('be.visible')
        } 
        else {
            cy.log('Certificate not generated yet')
            throw new Error('Certificate button not found on the page')
        }

    })

    // check application download button
    cy.get('body').then(body => {

        if (body.find('#html2pdf').length > 0) {
            cy.log('Application download button found')

            cy.get('#html2pdf')
              .should('be.visible')
        }

    })
}

// step7: Check all sections in view blade
export const viewBladeSectionsCheck = () => 
{
    cy.viewport(1920, 1080)

    // Click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)

    // Wait until table loads
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)

    // check texts exist - Section 1: ঠিকাদার নিবন্ধন নবায়ন
    cy.contains('span.section_head', 'ঠিকাদার নিবন্ধন নবায়ন').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের পরিচয়').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের নিবন্ধিত ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('span', 'প্রতিষ্ঠানের যোগাযোগের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত ব্যক্তির পরিচয়').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের আর্থিক তথ্যাবলি').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রয়োজনীয় সংযুক্তি').scrollIntoView().should('be.visible')
    
}