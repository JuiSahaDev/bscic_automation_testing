// step0: Applicant industrial cancellation registration
export const industrialCancellationAddForm = () => {

    cy.get('.panel-body').eq(0).contains('a', 'আবেদন').click() // click on শিল্প নিবন্ধন card  
    cy.wait(5000);
    cy.contains('label.checkbox-inline', 'বাতিল').first().click(); // click "বাতিল" radio button
    cy.wait(2000);
    cy.get('#select2-trackingSelect-container').click() // click on dropdown to load options

    // Wait for the dropdown options to load and be visible
    cy.get('.select2-results__option').should('have.length.greaterThan', 1).then(
        $options => {
            // remove first placeholder manually
            const realOptions = $options.slice(1)
            cy.wrap(realOptions.last()).click() // select last option which is the latest application
        }
    )

    cy.contains('a', 'পরবর্তী').should('be.visible').click() // পরবর্তী button
    cy.wait(3000)

    // check texts exist - Section 1: নিবন্ধন বাতিল
    cy.contains('p', 'নিবন্ধন বাতিল').scrollIntoView().should('be.visible')

    cy.contains('p', 'নিবন্ধন বাতিলের প্রয়োজনীয় তথ্য').scrollIntoView().should('be.visible')
    // নিবন্ধন বাতিলের প্রয়োজনীয় তথ্য
    cy.get('#cancel_reason').should('be.visible').type('কারখানার ঠিকানা পরিবর্তন')
    cy.wait(2000)
    cy.get('#cancel_date').should('be.visible').type('2024-12-31')
    cy.wait(2000)

    cy.contains('p', 'শিল্প নিবন্ধন সংক্রান্ত তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের প্রধান নির্বাহী/ব্যবস্থাপনা পরিচালক').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের কার্যাবলীর তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'উদ্যোক্তার পক্ষে আবেদনপত্র জমাদানকারি অনুমোদিত ব্যক্তির তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রয়োজনীয় সংযুক্তি').scrollIntoView().should('be.visible')
    
    cy.contains('p', 'সার্ভিস ফি পেমেন্ট').scrollIntoView().should('be.visible')

    //1. click save as draft tab
    cy.get('#save_as_draft').click()
    cy.wait(5000)

}

// step0.1: Open Applicant industrial cancellation registration edit blade and submit for payment
export const industrialCancellationEditSubmitFormOpen = () => {

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
    cy.get('[id="sfp_contact_address"]').should('be.visible').type('Mirpur, Dhaka')
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

    // Wait for navigation back from payment gateway
    cy.url({ timeout: 30000 }).should('not.include', 'spgwebuat.sonalibank.com.bd')
    cy.url({ timeout: 10000 }).should('include', '/client/industry-cancellation/list/')
    cy.wait(3000)

    // Verify payment success message
    cy.get('.alert-success', { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Payment submitted successfully')

}

// step1: Process application as 9th grade officer to recommend to 6th grade or observation or shortfall
export const extensionOfficer9thGradeOrEquivalentStep1 = () => 
{
    cy.viewport(1920, 1080)

    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()

    // Wait until table rows are loaded
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open the first application (Step 1 - 9th grade officer)
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })

    // ===============================
    // Step1: 9th grade → 6th grade
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

// step2: Process application as 6th grade officer to approve to applicant or reject or shortfall
export const assistantGeneralManager6thGradeOrEquivalentFinalStep = () => 
{
    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)

    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again (Step 2 - 6th grade officer)
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)

    // ===============================
    // Step2: 6th grade → Applicant
    // ===============================
    
    cy.get('#application_status').should('be.visible').select('Approved')
    cy.wait(2000)
    cy.get('button.btn-primary.send', { timeout: 10000 }).should('be.visible').and('not.be.disabled').click()
    cy.wait(3000)
    
    // ===============================
    // Rejected flow (commented but corrected)
    // ===============================

    // cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Rejected')
    // cy.wait(2000)

    // cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()
    // cy.wait(3000)

    // ===============================
    // Shortfall to 6th grade (commented but corrected)
    // ===============================

    // cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Shortfall')
    // cy.wait(2000)

    // cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()
    // cy.wait(3000)
}

// step3: Check certificate generation and application download
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

// step4: Check all sections in view blade
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

    // check texts exist - Section 1: নিবন্ধন বাতিল
    cy.contains('p', 'নিবন্ধন বাতিল').scrollIntoView().should('be.visible')
    cy.contains('p', 'নিবন্ধন বাতিলের প্রয়োজনীয় তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'শিল্প নিবন্ধন সংক্রান্ত তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের প্রধান নির্বাহী/ব্যবস্থাপনা পরিচালক').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের কার্যাবলীর তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'উদ্যোক্তার পক্ষে আবেদনপত্র জমাদানকারি অনুমোদিত ব্যক্তির তথ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রয়োজনীয় সংযুক্তি').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রয়োজনীয় সংযুক্তি').scrollIntoView().should('be.visible')

}