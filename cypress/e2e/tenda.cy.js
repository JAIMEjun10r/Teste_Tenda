describe('template spec', () => {

  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))
  });


  it('Adicionar dois produtos ao carrinho - um produto Tenda e um produto de um seller', () => {
    cy.visit('/')
    // cy.wait(5000)
    cy.contains('Meu carrinho', {timeout:14000})
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.numeroItem(0, 'Tenda')            // esse command usa a posição do produto 
    cy.numeroBtnAdicionar(0)    // esse usa a posição do botão
    cy.qtdCarrinho(1)
    // // incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.numeroItem(4, 'Benedito ME')
    cy.numeroBtnAdicionar(4)
    cy.qtdCarrinho(2)
    cy.get('.BlockTittleCartComponent > .title').scrollIntoView()


  })

  it('Adicionar mais um item ao produto Seller e ao produto Tenda', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', {timeout: 14000})
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.numeroItem(0, 'Tenda')            // esse command usa a posição do produto 
    cy.numeroBtnAdicionar(0)    // esse usa a posição do botão
    cy.qtdCarrinho(1)
    // // incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.numeroItem(4, 'Benedito ME')
    cy.numeroBtnAdicionar(4)
    cy.qtdCarrinho(2)
    cy.get('.BlockTittleCartComponent > .title').scrollIntoView()
    cy.get('div.box-quantity > :nth-child(3)').first().click({ force: true })
    cy.wait(3000)     //provisório, pois é necessário esperar que um item seja removido para então remover o outro
    cy.get('div.box-quantity > :nth-child(3)').last().click({ force: true })
    // cy.qtdCarrinho(4)

  });

  it('Remover um item do produto seller e um do produto Tenda', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', {timeout: 14000})
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.numeroItem(0, 'Tenda')            // esse command usa a posição do produto 
    cy.numeroBtnAdicionar(0)    // esse usa a posição do botão
    cy.qtdCarrinho(1)
    // // incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.wait(5000)     //esse cy.wait seria apenas provisório, pois iria usar o intercept para puxar a api até carregar
    cy.numeroItem(4, 'Benedito ME')
    cy.numeroBtnAdicionar(4)
    cy.qtdCarrinho(2)
    // aumentando a quantidade de itens
    cy.get('div.box-quantity > :nth-child(3)').first().click({ force: true })
    cy.wait(3000)     //provisório, pois é necessário esperar que um item seja removido para então remover o outro
    cy.get('div.box-quantity > :nth-child(3)').last().click({ force: true })
    cy.qtdCarrinho(4)
    //removendo a quantidade de itens
    cy.get('div.box-quantity > :nth-child(1)').first().click({ force: true })
    cy.wait(3000)
    cy.get('div.box-quantity > :nth-child(1)').last().click({ force: true })
    cy.qtdCarrinho(2)
  });

  it.only('Pagamento usando boleto', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', {timeout: 14000})
      .should('be.visible')
    cy.checkAndClick()
    //adicionando produto
    cy.get('.hot-link-name', {timeout: 10000})
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.numeroItem(0, 'Tenda')            // esse command usa a posição do produto 
    cy.numeroBtnAdicionar(0)    // esse usa a posição do botão
    cy.qtdCarrinho(1)
    // indo para o carrinho
    cy.contains('button[data-cy="btn-"]', 'Ver carrinho').click()
    cy.contains('Resumo do pedido', { timeout: 6000 })
      .should('be.visible')
    cy.confereUrl('carrinho')
    cy.contains('.resume-buttons > .btn', 'Continuar')
      .click()
    cy.confereUrl('separacao-pacotes')
    cy.contains('Resumo do pedido', { timeout: 6000 })
      .should('be.visible')
    cy.contains('.resume-buttons > .btn', 'Finalizar compra')
      .click()

    cy.contains('Boleto bancário').click()
    cy.contains('button[data-cy="btn-"]', 'Pagar com boleto')
      .should('be.visible')
      .click()
    cy.get('.content-checkout-tenda-variation > .action-area > :nth-child(2)')
      .click()
    


  });
})