describe('template spec', () => {

  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))
  });


  it('Adicionar dois produtos ao carrinho - um produto Tenda e um produto de um seller', () => {
    cy.visit('/')
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
    cy.get(':nth-child(3) > .btn-delivery')
      .should('be.visible')
      .click()
    cy.contains('Modalidade de entrega')
      .should('be.visible')
    cy.contains('.content', 'Clique & Retire')
      .click()
    cy.get(':nth-child(6) > .content')   // escolhi essa opção pq todas as outras estavam dando problemas com esse usuário
      .scrollIntoView()
      .click()
    cy.contains('Data de retirada')
      .should('be.visible')
    cy.get('.tab-day:nth-child(3)')   // aqui eu escolhi para ser sempre a "terceira" data
      .click()  
    cy.get('.card-information-component')  
      .click()
    cy.contains('.resume-buttons > .btn', 'Finalizar compra')
      .should('be.visible')
      .click()
    cy.contains('Boleto bancário', {timeout: 7000}).click()
    cy.contains('button[data-cy="btn-"]', 'Pagar com boleto')
      .should('be.visible')
      .click()
    cy.get('.thanks', {timeout: 20000})
      .should('be.visible')
    // daqui em diante o site parou de funcionar mais uma vez e meu usuário bugou novamente
    
  });

  it('Pagamento com cartão', () => {
    
  });
})