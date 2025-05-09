# MB Class - Projeto Pokémon

Este projeto é um exemplo de aplicação Next.js que utiliza uma API fake usando o `json-server` para salvar alguns dados e a [API do PokéAPI](http://pokeapi.co/) para obter dados de Pokémons.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Yarn](https://yarnpkg.com/) instalado (ou use npm se preferir)
- [json-server](https://github.com/typicode/json-server) instalado globalmente ou via script

## Instalação

Instale as dependências do projeto:

```bash
yarn install
# ou
npm install
```

## Rodando o servidor fake (json-server)

O projeto utiliza um arquivo `db.json` na raiz para simular uma API REST.

Para iniciar o json-server:

```bash
npx json-server --watch db.json --port 3001
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001)

## Rodando o front-end

Em outro terminal, inicie o servidor de desenvolvimento do Next.js:

```bash
yarn dev
# ou
npm run dev
```

O front-end estará disponível em: [http://localhost:3000](http://localhost:3000)

## Acessando o projeto

1. Certifique-se de que o `json-server` está rodando em `localhost:3001`.
2. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

---

Se tiver dúvidas, abra uma issue ou entre em contato!
