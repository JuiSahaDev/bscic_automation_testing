export const applicantLoginPage = () => {
    cy.contains(' Login ', { timeout: 10000 }).should('be.visible').click();
    cy.wait(2000);
    cy.contains('Login in Classic Mode', { timeout: 10000 }).should('be.visible').click();
    cy.wait(5000); // Wait longer for SSO redirect
    
    // Wait for SSO page to load before using cy.origin
    cy.url({ timeout: 30000 }).should('include', 'uat-id.oss.net.bd');
    
    // Handle cross-origin SSO login
    cy.origin('https://uat-id.oss.net.bd', () => {
        // Suppress errors from the SSO page
        cy.on('uncaught:exception', (err) => {
            // Ignore baseUrl and other SSO page errors
            return false
        })
        
        cy.get('[id="identifier"]', { timeout: 15000 }).should('be.visible').type('halimkhanfeni7@gmail.com')
        cy.get('[id="next_btn"]').should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="password"]', { timeout: 15000 }).should('be.visible').type('123456a@')
        cy.get('[id="login_btn"]').should('be.visible').click()
        cy.wait(10000) // Increased wait for slow redirect
    })
    
    // Wait for redirect back to main app with longer timeout
    cy.url({ timeout: 60000 }).should('include', 'dev-bscic.oss.net.bd')
    cy.wait(5000)
    
    // Handle company selection modal
    cy.get('body').then(($body) => {
        if ($body.find('.modal').length > 0) {
            cy.log('Company selection modal detected')
            cy.wait(2000)
            // Click Submit button in modal
            cy.contains('button', 'Submit').should('be.visible').click()
            cy.wait(3000)
        }
    })
}

export const deskUserLoginPage = () => {
    cy.contains(' Login ', { timeout: 10000 }).should('be.visible').click();
    cy.wait(2000);
    cy.contains('Login in Classic Mode', { timeout: 10000 }).should('be.visible').click();
    cy.wait(3000);
    
    // Check if we're redirected to SSO or already logged in
    cy.url({ timeout: 10000 }).then((url) => {
        if (url.includes('uat-id.oss.net.bd')) {
            // Handle cross-origin SSO login
            cy.origin('https://uat-id.oss.net.bd', () => {
                // Suppress errors from the SSO page
                cy.on('uncaught:exception', (err) => {
                    // Ignore baseUrl and other SSO page errors
                    return false
                })
                
                cy.get('[id="identifier"]', { timeout: 10000 }).should('be.visible').type('rd1@batworld.com')
                cy.get('[id="next_btn"]').should('be.visible').click()
                cy.wait(2000)
                cy.get('[id="password"]', { timeout: 10000 }).should('be.visible').type('Ossp@123')
                cy.get('[id="login_btn"]').should('be.visible').click()
                cy.wait(10000) // Increased wait for slow redirect
            })
            
            // Wait for redirect back to main app - increase timeout for slow redirect
            cy.wait(10000)
            cy.url({ timeout: 180000 }).should('include', 'dev-bscic.oss.net.bd')
            cy.wait(3000)
        } else if (url.includes('dev-bscic.oss.net.bd')) {
            // Already logged in, just wait
            cy.log('Already logged in to main application')
            cy.wait(2000)
        }
    })
}

export const applicantLogoutPage = () => {
    cy.url().then((currentUrl) => {
        if (currentUrl.includes('/login')) {
            cy.log('Already on login page, skipping logout action')
            return
        }

        // Close any open modals first
        cy.get('body').then(($body) => {
            if ($body.find('.modal.fade.in').length > 0) {
                cy.log('Modal detected, closing it first')
                // Try to close modal by clicking close button or backdrop
                cy.get('.modal.fade.in').then(($modal) => {
                    if ($modal.find('.close, [data-dismiss="modal"]').length > 0) {
                        cy.get('.close, [data-dismiss="modal"]').first().click({ force: true })
                    } else {
                        // Click modal backdrop to close
                        cy.get('.modal-backdrop').click({ force: true })
                    }
                })
                cy.wait(2000)
            }
        })

        // Click on profile dropdown
        cy.xpath('/html/body/div[1]/header/nav/div/ul/li[3]/a/span', { timeout: 10000 }).should('be.visible').click({ force: true })
        cy.wait(2000)
        // Click on logout button
        cy.xpath('/html/body/div[1]/header/nav/div/ul/li[3]/ul/li[2]/div[2]/a', { timeout: 10000 }).should('be.visible').click({ force: true })
        cy.wait(3000)

        // Wait for logout to complete and redirect to homepage
        cy.url({ timeout: 10000 }).should('include', 'dev-bscic.oss.net.bd')
        cy.wait(2000)

        // Clear all session data thoroughly
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.clearAllSessionStorage()

        // Force reload to ensure clean state
        cy.reload()
        cy.wait(3000)
    })
}

