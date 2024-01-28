describe('Testes Tenda', () => {

  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('senha'))
  });

  let cartao = {
    numeroCartao: 4000000000000010,
    validade: 1,
    cvv: 123,
    ano: 2025,
    nome: 'Teste',
    cpf: 76868044020,
    parcela: 1

  }
  

  it.only('Adicionar dois produtos ao carrinho - um produto Tenda e um produto de um seller', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', { timeout: 14000 })
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.posicaoProduto(0, 'Tenda')            // esse command usa a posição do produto 
    cy.qtdCarrinho(1)
    // // incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.posicaoProduto(4, 'Benedito ME')
    cy.qtdCarrinho(2)
    cy.get('.BlockTittleCartComponent > .title').scrollIntoView()


  })

  it('Adicionar mais um item ao produto Seller e ao produto Tenda', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', { timeout: 14000 })
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.posicaoProduto(0, 'Tenda')            // esse command usa a posição do produto 
    cy.qtdCarrinho(1)
    // incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.posicaoProduto(4, 'Benedito ME')
    cy.qtdCarrinho(2)
    cy.get('.BlockTittleCartComponent > .title').scrollIntoView()
    cy.get('div.box-quantity > :nth-child(3)').first().click({ force: true })
    cy.wait(3000)     //provisório, pois é necessário esperar que um item seja removido para então remover o outro
    cy.get('div.box-quantity > :nth-child(3)').last().click({ force: true })
    cy.qtdCarrinho(4)

  });

  it('Remover um item do produto seller e um do produto Tenda', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', { timeout: 14000 })
      .should('be.visible')
    cy.checkAndClick()
    cy.get('.hot-link-name')
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.posicaoProduto(0, 'Tenda')            // esse command usa a posição do produto 
    cy.qtdCarrinho(1)
    //incluindo o segundo produto de um seller
    cy.get('#searchbarComponent').type('produto seller')
    cy.contains('Buscar').click()
    cy.posicaoProduto(4, 'Benedito ME')
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

  it('Pagamento usando boleto', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', { timeout: 14000 })
      .should('be.visible')
    cy.checkAndClick()
    //adicionando produto
    cy.get('.hot-link-name', { timeout: 10000 })
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.posicaoProduto(0, 'Tenda')            // esse command usa a posição do produto 
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
    //Aqui eu fiz ele checar se a parte para cadastrar um endereço aparecer, ele irá preencher. Caso não apareça, ele irá prosseguir
    cy.get('body').then(($body) => {
      if ($body.find(':nth-child(3) > .btn-delivery').length > 0) {
        cy.get(':nth-child(3) > .btn-delivery')
          .click();
        cy.contains('Modalidade de entrega')
          .should('be.visible');
        cy.contains('.content', 'Clique & Retire')
          .click();
        cy.get(':nth-child(6) > .content')
          .scrollIntoView()
          .click();
        cy.contains('Data de retirada')
          .should('be.visible');
        cy.get('.tab-day:nth-child(3)')
          .click();
        cy.get('.card-information-component')
          .click();
        cy.contains('.resume-buttons > .btn', 'Finalizar compra')
          .should('be.visible')
          .click();
      }
    });
    //
    cy.contains('Boleto bancário', { timeout: 7000 }).click()
    cy.contains('button[data-cy="btn-"]', 'Pagar com boleto')
      .should('be.visible')
      .click()
    cy.get('.thanks', { timeout: 20000 })
      .should('be.visible')


  });

  it('Pagamento com cartão', () => {
    cy.visit('/')
    cy.contains('Meu carrinho', { timeout: 14000 })
      .should('be.visible')
    cy.checkAndClick()
    //adicionando produto
    cy.get('.hot-link-name', { timeout: 10000 })
      .first()
      .click({ force: true })
    cy.contains('h1', 'Todos', { timeout: 14000 })
      .should('be.visible')
    cy.posicaoProduto(4, 'Tenda')            // esse command usa a posição do produto 
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
    //Aqui eu fiz ele checar se a parte para cadastrar um endereço aparecer, ele irá preencher. Caso não apareça, ele irá prosseguir
    //Poderia ter colocado dentro de um custom command. Mas para entregar o teste logo, deixei assim
    cy.get('body').then(($body) => {
      if ($body.find(':nth-child(3) > .btn-delivery').length > 0) {
        cy.get(':nth-child(3) > .btn-delivery')
          .click();
        cy.contains('Modalidade de entrega')
          .should('be.visible');
        cy.contains('.content', 'Clique & Retire')
          .click();
        cy.get(':nth-child(6) > .content')
          .scrollIntoView()
          .click();
        cy.contains('Data de retirada')
          .should('be.visible');
        cy.get('.tab-day:nth-child(3)')
          .click();
        cy.get('.card-information-component')
          .click();
        cy.contains('.resume-buttons > .btn', 'Finalizar compra')
          .should('be.visible')
          .click();
      }
    });

    cy.contains('Cartão de crédito', { timeout: 7000 })
      .click()
    cy.contains('Número do cartão')
      .should('be.visible')
    cy.get('#number').type(cartao.numeroCartao)
    cy.get('#month').type(cartao.validade + '{enter}')
    cy.get('#year').type(cartao.ano + '{enter}')
    cy.get('#cvv').type(cartao.cvv)
    cy.get('#name').type(cartao.nome)
    cy.get('#cpf').type(cartao.cpf)
    cy.get('#installments').type(cartao.parcela + '{enter}')
    cy.get('.CreditCardComponent > [data-cy="btn-"]').click()
    cy.get('.thanks', { timeout: 30000 })
      .should('be.visible')
  });
})