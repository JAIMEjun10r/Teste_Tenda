// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('escolherNumero', () => {
    return Math.floor(Math.random() * 10);
});


Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('/')
        // cy.wait(5000)
        cy.get('.text-hello').click()
        cy.get('#login').type(email)
        cy.get('#password').type(password)
        cy.get('.row_action_login > [data-cy="btn-"]').click()
        cy.get('.username')
            .should('be.visible')
            .and('contain', 'Olá, Teste')
    })
})

Cypress.Commands.add('numeroItem', (num, vendedor) => {
    cy.get('.card .card-item')
        .eq(num)
        .should('contain', `Vendido por: ${vendedor}`)
})

Cypress.Commands.add('numeroBtnAdicionar', (num) => {
    cy.get('.card .card-item')
        .eq(num)
        .find('#buttonbuy-sku-')
        .click({ force: true })
})

Cypress.Commands.add('qtdCarrinho', (qtd) => {
    cy.get('.icon-cart-qtd')
        .should('be.visible', { timeout: 16000 })
        .and('have.text', qtd)
})



Cypress.Commands.add('checkAndClick', () => {
    cy.get('body').then(($body) => {
        if ($body.find('.icon-cart-qtd').length > 0) {
            // Se a classe .icon-cart-qtd existir, ele vai clicar 
            cy.get('div.box-quantity > :nth-child(1)').first().click({ force: true }).then(() => {
                // Aqui eu coloquei ele para verificar novamente se a classe .icon-cart-qtd ainda existe após o clique
                cy.get('body').then(($body) => {
                    if ($body.find('.icon-cart-qtd').length > 0) {
                        // Se a classe .icon-cart-qtd ainda existir, ele chama o programa 
                        cy.checkAndClick();
                    }
                });
            });

        }
    });
});

Cypress.Commands.add('confereUrl', (path) => {
    const url = `${Cypress.config().baseUrl}${path}`;
    cy.url().should('eq', url);
});

