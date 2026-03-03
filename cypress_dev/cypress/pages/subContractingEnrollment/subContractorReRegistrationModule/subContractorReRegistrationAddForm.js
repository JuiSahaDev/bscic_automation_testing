// step0: Applicant industrial new registration
export const subContractorReRegistrationAddForm = () => {
    
    cy.get('.panel-body').eq(2).contains('a', 'আবেদন').click()  // click on সাব-কনট্রাকটিং তালিকাভুক্তি  card  
    cy.wait(5000);
    cy.contains('label.checkbox-inline', 'পুনঃ তালিকাভুক্তিকরণ').first().click(); // click "পুনঃ তালিকাভুক্তিকরণ" radio button
    cy.wait(2000);
    cy.contains('a.btn', 'পরবর্তী').click(); // click next button
    cy.wait(2000);

    // সাধারণ তথ্য
    cy.get('#working_capital', { timeout: 20000 }).should('be.visible').clear().type('2000000') // চলতি মূলধন
    cy.wait(2000)
    cy.get('#permanent_investment', { timeout: 20000 }).should('be.visible').clear().type('5000000') // স্থায়ী বিনিয়োগ
    cy.wait(2000)
    cy.get('#factory_establishment_date', { timeout: 20000 }).should('be.visible').clear().type('01-01-2020')
    cy.wait(2000)
    cy.get('#total_land_area', { timeout: 20000 }).should('be.visible').type('25')
    cy.wait(2000)
    cy.get('#company_type_id', { timeout: 20000 }).should('be.visible').select('1') // জমির পরিমান একক (একর)
    cy.wait(2000)
    cy.get('body').then(($body) => {
        const visibleFactoryLocation = $body.find('#factory_location:visible')
        if (visibleFactoryLocation.length > 0) {
            cy.wrap(visibleFactoryLocation.first()).clear().type('Dhaka')
            cy.wait(2000)
        }
    })

    // প্রতিষ্ঠানের উৎপাদিত যন্ত্র/যন্ত্রাংশ/পণ্য
    cy.get('#product_part_name').should('be.visible').clear().type('Power Tiller Parts, Irrigation Pump Impeller, Rice Threshing Machine Spare Parts, Steel Bearing Housing', { force: true })
    cy.wait(2000);
    
    // প্রতিষ্ঠানের জনবল 
    cy.get('#org_manpower_skilled').should('be.visible').clear().type('15')
    cy.wait(2000);
    cy.get('#org_manpower_semi_skilled').should('be.visible').clear().type('25')
    cy.wait(3000);

    // কাঁচামালের বিবরণ
    // ক. স্থানীয়ভাবে সংগৃহীত/সংগৃহীতব্য
    cy.get('#local_raw_material_details').should('be.visible').clear().type('MS (Mild Steel) Rod, Cast Iron, Locally Manufactured Bolts and Nuts, Rubber Seal', { force: true })
    cy.wait(2000);

    // খ. আমদানিকৃত/আমদানিতব্য
    cy.get('#imported_raw_material_details').should('be.visible').clear().type('Stainless Steel Sheet, Industrial Grade Bearing, Special Alloy Steel, Electric Motor Components', { force: true })
    cy.wait(2000);

    // Click Next button to navigate to Section 2 (যন্ত্রপাতি এবং সরঞ্জামাদির তথ্য)
    cy.get('a.next').eq(0).click()
    cy.wait(5000)
    
    // 2. যন্ত্রপাতি এবং সরঞ্জামাদির তথ্য
    // স্থানীয়ভাবে সংগৃহীত/সংগৃহীতব্য 
    cy.get('#locally_machinery_name').eq(0).type('Machinery ABC')
    cy.get('#locally_machinery_specification').eq(0).type('25')
    cy.get('#locally_machinery_amount').eq(0).type('22')

    // উৎপাদিত সাব-কনট্রাকটিং পণ্য বিভিন্ন প্রতিষ্ঠানে সরবরাহের অভিজ্ঞতা 
    cy.get('#experience_manufactured_goods').eq(0).type('ABC')
    cy.get('#supplied_org_name').eq(0).type('Building ABC Limited')
    cy.wait(3000)

    // next tab
    cy.get('a.next').eq(0).click()
    cy.wait(5000)

    //3.  সংযুক্তি
    cy.get('[id="accept_terms"]').click()
    cy.get('a.next').eq(0).click({ force: true })
    cy.wait(5000)

    //4. পেমেন্ট এবং সাবমিট
    cy.get('[id="sfp_contact_address"]').should('be.visible').type('Mirpur, Dhaka')
    cy.wait(3000)
    cy.get('#submitForm', { timeout: 20000 }).scrollIntoView().should('be.visible').and('not.be.disabled').click({ force: true }) //pay button
    
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
    cy.url({ timeout: 10000 }).should('include', '/client/subcontractor-re-registration/list/')
    cy.wait(3000)

    // Verify payment success message
    cy.get('.alert-success', { timeout: 15000 })
      .should('be.visible')
      .and('contain', 'Payment submitted successfully')

}

// step1: Process application as desk user
export const deputyGeneralManagerStep1 = () => 
{
    cy.viewport(1920, 1080)

    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()

    // Wait until table rows are loaded
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open the first application (Step 1 - 9th grade officer)
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })


    // ===============================
    // Step1: DGM → AE/EO
    // =============================

    //  Send To Assistant Engineer (AE) / Send To Extension Officer (EO)
    // Send To Assistant Engineer (AE)
    // cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Send To Assistant Engineer (AE)')
    // cy.wait(2000)
    // cy.get('#is_user').should('be.visible').select('rd 1')
    // cy.wait(2000)
    // cy.contains('button', 'Process').should('be.visible').click()
    // cy.wait(3000)

    // Send To Extension Officer (EO)
    cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Send To Extension Officer (EO)')
    cy.wait(2000)
    cy.get('#is_user').should('be.visible').select('rd 1')
    cy.wait(2000)
    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)

}

// step2: Process application as 6th grade officer
export const assistantEngineerOrExecutiveOfficerStep2 = () => 
{

    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)

    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)

    // ===============================
    // Step2: AE → DGM
    // ===============================

    // Verified to প্রধান প্রকৌশলী
    cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Processed to DGM (Sub-con)')
    cy.wait(2000)
    cy.get('#is_user').should('be.visible').select('rd 1')
    cy.wait(2000)

    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)

}

// step3: Process application as chief engineer and approve for payment
export const deputyGeneralManagerFinalStep3 = () => 
{
    // click on application list
    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)
    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)

    // ===============================
    // Step1: DGM → Sign The Registration
    // ===============================

    // Recommended to উপ প্রধান প্রকৌশলী
    cy.get('#application_status', { timeout: 20000 }).should('be.visible').select('Sign The Registration')
    cy.wait(2000)
    cy.contains('button', 'Process').should('be.visible').click()
    cy.wait(3000)
}

// step5: Check certificate generation and application download
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

// step6: Check all sections in view blade
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

    // check texts exist - Section 1: সাব-কনট্রাকটিং তালিকাভুক্তি
    cy.contains('span.section_head', 'সাব-কনট্রাকটিং তালিকাভুক্তি').scrollIntoView().should('be.visible')
    cy.contains('সাধারণ তথ্য').scrollIntoView().should('be.visible')
    cy.contains('প্রতিষ্ঠানের কার্যালয়ের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('প্রতিষ্ঠানের কারখানার ঠিকানা').scrollIntoView().should('exist')
    cy.contains('প্রতিষ্ঠানের উদ্যোক্তা/পরিচালকগণের তথ্য').scrollIntoView().should('exist')
    cy.contains('প্রতিষ্ঠানের প্রধান নির্বাহী/ব্যবস্থাপনা পরিচালক').scrollIntoView().should('exist')
    cy.contains('p', 'আবেদনকারি সংশিষ্ট বিসিক কার্যলয়ের নাম').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের উৎপাদিত যন্ত্র/যন্ত্রাংশ/পণ্য').scrollIntoView().should('be.visible')
    cy.contains('p', 'প্রতিষ্ঠানের জনবল').scrollIntoView().should('be.visible')

    cy.contains('p', 'কাঁচামালের বিবরণ').scrollIntoView().should('be.visible')
    cy.contains('p', 'যন্ত্রপাতি ও সরঞ্জামাদি').scrollIntoView().should('be.visible')
    cy.contains('p', 'উৎপাদিত সাব-কনট্রাকটিং পণ্য বিভিন্ন প্রতিষ্ঠানে সরবরাহের অভিজ্ঞতা').scrollIntoView().should('be.visible')

    // Section 5: সংযুক্তি
    cy.contains('p.section_head', 'সংযুক্তি').scrollIntoView().should('be.visible')
    cy.contains('সংযুক্তি').scrollIntoView().should('exist')

}