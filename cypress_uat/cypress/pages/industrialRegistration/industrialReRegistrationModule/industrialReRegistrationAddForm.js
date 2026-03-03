// step0: Applicant registration
export const industrialReRegistrationAddForm  = () => {
    cy.get('.panel-body').eq(0).contains('a', 'আবেদন').click()  // click on শিল্প নিবন্ধন card   
    cy.wait(5000);
    cy.contains('label.checkbox-inline', 'পুনঃনিবন্ধন').first().click(); // click "পুনঃনিবন্ধন" radio button
    cy.wait(2000);
    cy.contains('a.btn', 'পরবর্তী').click(); // click next button
    cy.wait(2000);

    cy.get('[id="manual_reg_number"]').type('DH-20260202-manually') //manual registration number
    cy.wait(2000);
    cy.get('[id="manual_reg_date"]').should('be.visible').type('01-06-2023').click()
    cy.wait(2000);
    cy.get('[id="project_name"]').type('Test Project ABC')
    cy.wait(2000);

    // cy.get('[id="company_office_mobile"]').type('1627363947', { force: true })
    // cy.wait(2000);
    // cy.xpath('//*[@id="same_address"]').click()
    // cy.wait(2000);

    // cy.get('[id="addMoreDirector"]').first().should('be.visible').click()
    // cy.wait(2000);
    // cy.xpath('/html/body/div[1]/div[1]/section/section/div/div[2]/div/div[1]/div/div/form/div[3]/div[3]/div/div/div/label[2]/input').click()
    // cy.wait(2000);
    // cy.xpath('/html/body/div[1]/div[1]/section/section/div/div[2]/div/div[1]/div/div/form/div[3]/div[4]/div/div/div/label[1]/input').click()
    // cy.wait(2000);
    // cy.xpath('/html/body/div[1]/div[1]/section/section/div/div[2]/div/div[1]/div/div/form/div[3]/div[5]/div/div/div/label/input').click()
    // cy.wait(2000);
    // cy.xpath('/html/body/div[1]/div[1]/section/section/div/div[2]/div/div[1]/div/div/form/div[3]/div[7]/div/fieldset/div[5]/div/input').type('5505028877')
    // cy.wait(2000);
    // cy.get('[id="nid_dob"]').should('be.visible').type('02-Jan-1985').click()
    // cy.wait(2000)
    // cy.get('[id="user_nid_name"]').type('MD JALAL SHEK')
    // cy.wait(2000)

    // cy.xpath('/html/body/div[2]/div[3]/div[1]/div/div/span/div[1]').click() // Modal may not always appear
    // cy.wait(2000);
    // Recaptcha cannot be automated due to cross-origin iframe restrictions
    // Manual intervention may be needed or use test recaptcha key
    // cy.wait(3000) // Wait for recaptcha to load
    // // Click verify button directly
    // cy.xpath('/html/body/div[1]/div[1]/section/section/div/div[2]/div/div[1]/div/div/form/div[3]/div[7]/div/fieldset/div[9]/button/i', { timeout: 10000 }).should('be.visible').click()
    // cy.wait(2000)
    // cy.get('[id="maleRadio"]').click({ force: true })
    // cy.wait(2000)
    // cy.get('[id="btn_save"]').click({ force: true })
    // cy.wait(3000)
    // cy.get('[id="correspondent_signature"]').first().click()
    // cy.wait(1000)
    // cy.get('[id="correspondent_signature"]').first().attachFile('signature.jpeg')
    // cy.wait(2000)
    // cy.get('[id="cropImageBtn"]').first().should('be.visible').click()
    // cy.wait(3000)

    // নিবন্ধন তথ্য
    //ক. প্রতিষ্ঠানের কার্যাবলীর তথ্য
    // cy.get('[id="company_ceo_fatherName"]').should('be.visible').type('xyxz')
    // cy.get('[id="company_ceo_mobile"]').should('be.visible').type('1627363947', { force: true })

    //খ. প্রতিষ্ঠানের বার্ষিক উৎপাদন ক্ষমতা 
    cy.get('[id="service_name_0"]').should('be.visible').type('ABC')
    cy.get('[id="quantity_0"]').should('be.visible').type('125')
    cy.get('[name="unit[0]"]').should('be.visible').select('কেজি')
    cy.get('[id="amount_bdt_0"]').should('be.visible').type('500')
    cy.wait(2000)

    // গ. বিক্রয় %
    cy.get('[id="local_sales_per"]').should('be.visible').type('44')

    //ঘ. প্রতিষ্ঠানের জনবল 
    cy.get('[id="local_male"]').should('be.visible').type('44')
    cy.get('[id="local_female"]').should('be.visible').type('56')
    cy.get('[id="foreign_male"]').should('be.visible').type('56')
    cy.get('[id="foreign_female"]').should('be.visible').type('44')
   
    //ঙ. প্রয়োজনীয় উপযোগ-সেবার বিবরণ
    cy.get('input[name="services_availability[0]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[0]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('10')
    cy.wait(1000)
    cy.get('input[name="services_availability[0]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('মিটার')
    cy.wait(2000)

    cy.get('input[name="services_availability[1]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[1]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('2600')
    cy.wait(1000)
    cy.get('input[name="services_availability[1]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('কিলোমিটার')
    cy.wait(2000)

    cy.get('input[name="services_availability[2]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[2]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('2600')
    cy.wait(1000)
    cy.get('input[name="services_availability[2]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('কিলোমিটার')
    cy.wait(2000)

    cy.get('input[name="services_availability[3]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[3]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('2707')
    cy.wait(1000)
    cy.get('input[name="services_availability[3]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('কিলোমিটার')
    cy.wait(2000)

    cy.get('input[name="services_availability[4]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[4]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('2800')
    cy.wait(1000)
    cy.get('input[name="services_availability[4]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('মিটার')
    cy.wait(2000)

    cy.get('input[name="services_availability[5]"][value="1"]').click()
    cy.wait(1000)
    cy.get('input[name="services_availability[5]"][value="1"]').closest('tr').find('input[id="utility_distance"]').clear().type('2900')
    cy.wait(1000)
    cy.get('input[name="services_availability[5]"][value="1"]').closest('tr').find('select[id="utility_distance_unit"]').select('মিটার')
    cy.wait(2000)

    // চ. বিনিয়োগ
    cy.get('[id="local_land_ivst"]').should('be.visible').should('be.visible').type('44')
    cy.get('[id="local_building_ivst"]').should('be.visible').type('56')
    cy.get('[id="local_machinery_ivst"]').should('be.visible').type('44')
    cy.get('[id="local_others_ivst"]').should('be.visible').type('56')
    cy.get('[id="local_wc_ivst"]').should('be.visible').type('100')
    cy.get('[id="usd_exchange_rate"]').should('be.visible').type('300')
    cy.wait(2000)

    // বিনিয়োগের উৎস
    cy.get('[id="ceo_taka_invest"]').should('be.visible').type('55')
    cy.get('[id="ceo_dollar_invest"]').should('be.visible').type('66')
    cy.get('[id="ceo_loan_country"]').should('be.visible').type('Australia')
    cy.wait(3000)
    cy.get('[id="local_loan_taka"]').should('be.visible').type('77')
    cy.get('[id="local_loan_dollar"]').should('be.visible').type('88')
    cy.get('[id="local_loan_country"]').should('be.visible').type('Afghanistan')
    cy.wait(3000)
    cy.get('[id="foreign_loan_taka"]').should('be.visible').type('99')
    cy.get('[id="foreign_loan_dollar"]').should('be.visible').type('111')
    cy.get('[id="foreign_loan_country"]').should('be.visible').type('France')
    cy.wait(3000)

    // দেশভিত্তিক ঋণের উৎস
    cy.get('select[name="loan_country_id[0]"]').should('be.visible').select('4')
    cy.get('input[name="loan_org_nm[0]"]').should('be.visible').type('ABC Ltd')
    cy.get('input[name="loan_amount[0]"]').should('be.visible').type('999')
    cy.get('input[name="loan_receive_date[0]"]').should('be.visible').type('01-06-2023').click()
    cy.wait(2000)

    //1. next tab
    cy.get('a.next').eq(0).click()
    cy.wait(5000)

    //যন্ত্রপাতি ও সরঞ্জামাদি
    // First row
    cy.get('input[name="machinery_nm[0]"]').should('be.visible').type('Machinery ABC')
    cy.get('input[name="machinery_qty[0]"]').should('be.visible').type('25')
    cy.get('input[name="machinery_price[0]"]').should('be.visible').type('22')

    cy.get('input[name="import_machinery_nm[0]"]').should('be.visible').type('Building ABC')
    cy.get('input[name="import_machinery_qty[0]"]').should('be.visible').type('30')
    cy.get('input[name="import_machinery_price[0]"]').should('be.visible').type('22')
    cy.wait(3000)

    //কাঁচামাল ও মোড়ক উপকরণের বিবরণ
    //ক. স্থানীয়ভাবে সংগৃহীত/সংগৃহীতব্য

    cy.get('input[name="local_raw_material_name[0]"]').should('be.visible').type('A')
    cy.get('input[name="local_raw_material_quantity[0]"]').should('be.visible').type('50')
    cy.get('select[name="local_raw_material_unit[0]"]').should('be.visible').select('2')
    cy.get('input[name="local_raw_material_amount_bdt[0]"]').should('be.visible').type('20')
    cy.wait(2000)

    //খ. আমদানিকৃত/আমদানিতব্য
    cy.get('input[name="imported_raw_material_name[0]"]').should('be.visible').type('B')
    cy.get('input[name="imported_raw_material_quantity[0]"]').should('be.visible').type('60')
    cy.get('select[name="imported_raw_material_unit[0]"]').should('be.visible').select('2')
    cy.get('input[name="imported_raw_material_amount_bdt[0]"]').should('be.visible').type('30')
    cy.wait(2000)

    //2. Navigate to next tab
    cy.get('a.next').eq(0).click()
    cy.wait(5000)

    //3. Navigate to next tab
    cy.get('a.next').eq(0).click()
    cy.wait(5000)
    
    //4. Fill authorization details
    cy.get('[id="auth_person_desig"]', { timeout: 10000 }).should('be.visible').type('Director')
    cy.get('[id="auth_person_address"]').should('be.visible').type('Mirpur, Dhaka')
    cy.get('[id="authorization_letter"]').first().attachFile('1.pdf')
    cy.get('input[id^="file"]').first().attachFile('1.pdf')
    cy.get('[id="accept_terms"]').click()
    cy.get('a.next').eq(0).click({ force: true })
    cy.wait(5000)

    //5. Payment and submit
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
    cy.url({ timeout: 10000 }).then((currentUrl) => {
        if (currentUrl.includes('/client/industry-re-registration/list/')) {
            cy.wait(3000)
            cy.get('.alert-success', { timeout: 15000 })
              .should('be.visible')
              .and('contain', 'Payment submitted successfully')
        } else if (currentUrl.includes('/login')) {
            cy.log('Redirected to login after payment (session timeout/SSO redirect)')
        } else {
            expect(currentUrl).to.include('/client/industry-re-registration/list/')
        }
    })

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
    // ===============================
    // Step2: 6th grade → Applicant
    // ===============================

    cy.contains('a', 'আবেদন', { timeout: 15000 }).should('be.visible').first().click()
    cy.wait(3000)
    // Wait again for table load
    cy.get('table tbody tr', { timeout: 20000 }).should('have.length.greaterThan', 0)

    // Open first application again
    cy.get('a.common_batch_update', { timeout: 20000 }).first().click({ force: true })
    cy.wait(3000)
    // Approved to Applicant
    // cy.get('#application_status', { timeout: 15000 }).should('be.visible').select('Approved')
    // cy.contains('button', 'Process', { timeout: 15000 }).should('be.visible').click()
    
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

    // check texts exist - Section 1: শিল্প পুনঃনিবন্ধন
    cy.contains('span.section_head', 'শিল্প পুনঃনিবন্ধন').scrollIntoView().should('be.visible')
    cy.contains('p', 'পুনঃ নিবন্ধনের জন্য প্রয়োজনীয় তথ্য').scrollIntoView().should('be.visible')
    cy.contains('সাধারণ তথ্য').scrollIntoView().should('be.visible')
    cy.contains('প্রতিষ্ঠানের কার্যালয়ের ঠিকানা').scrollIntoView().should('be.visible')
    cy.contains('প্রতিষ্ঠানের কারখানার ঠিকানা').scrollIntoView().should('exist')
    cy.contains('প্রতিষ্ঠানের প্রধান নির্বাহী/ব্যবস্থাপনা পরিচালক').scrollIntoView().should('exist')

    // Section 2: নিবন্ধন তথ্য
    cy.contains('p.section_head', 'নিবন্ধন তথ্য').scrollIntoView().should('be.visible')
    cy.wait(1000)
    cy.contains('ক. প্রতিষ্ঠানের কার্যাবলীর তথ্য').scrollIntoView().should('exist')
    cy.contains('খ. প্রতিষ্ঠানের বার্ষিক উৎপাদন ক্ষমতা').scrollIntoView().should('exist')
    cy.contains('গ. বিক্রয় %').scrollIntoView().should('be.visible')
    cy.contains('ঘ. প্রতিষ্ঠানের জনবল').scrollIntoView().should('exist')
    cy.contains('ঙ. প্রয়োজনীয় উপযোগ-সেবার বিবরণ').scrollIntoView().should('be.visible')
    cy.contains('চ. বিনিয়োগ').scrollIntoView().should('be.visible')

    // Section 3: যন্ত্রপাতি ও সরঞ্জামাদি
    cy.contains('p.section_head', 'যন্ত্রপাতি ও সরঞ্জামাদি').scrollIntoView().should('be.visible')
    cy.wait(1000)
    cy.contains('যন্ত্রপাতি ও সরঞ্জামাদি').scrollIntoView().should('exist')
    cy.contains('কাঁচামাল ও').scrollIntoView().should('be.visible')

    // Section 4: উদ্যোক্তাগণের তথ্য
    cy.contains('p.section_head', 'উদ্যোক্তাগণের তথ্য').scrollIntoView().should('be.visible')
    cy.contains('প্রতিষ্ঠানের উদ্যোক্তা/পরিচালকগণের তথ্য').scrollIntoView().should('exist')

    // Section 5: সংযুক্তি
    cy.contains('p.section_head', 'সংযুক্তি').scrollIntoView().should('be.visible')
    cy.contains('উদ্যোক্তার পক্ষে আবেদনপত্র').scrollIntoView().should('exist')
    cy.contains('সংযুক্তি').scrollIntoView().should('exist')

}