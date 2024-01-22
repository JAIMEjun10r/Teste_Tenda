# Teste Tenda(E2E) 
- O site de testes ficou caindo e, posteriormente, voltava 3 horas depois. E o tentar continuar, caía de novo. Fiz até onde foi possível
- com essa situação. Fiz com que os testes fossem independentes entre si
## Pré-requisitos
- Este projeto utiliza da versão v20.10.0 do Node.js
- Caso não tenha o Node.js, baixe-o na mesma versão do projeto ou superior

## Rodando locamente

Clone o projeto para uma pasta da sua escolha

```bash
git clone https://github.com/JAIMEjun10r/Teste_Tenda
```

Entre no diretório do projeto

```bash
  cd pasta_que_você_escolheu
```

Para instalar as dependências, digite:
```bash
  npm install
```

## Rodando os testes

```bash
  npx cypress open
```

- Os testes são independentes entre si
