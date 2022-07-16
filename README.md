# Movies Repository

## Instalação

```bash
# Copiar o diretório
git clone https://github.com/rwellingtonr/movies-repo-nestjs.git

# Abra a pasta
cd movies-repo-nestjs

#Instalação de dependências
yarn

#Abrir com o editor de texto (opcional)
code .

# Copie as variáveis de ambiente
cp .env.example .env

# Iniciar o programa
docker-compose up -d && yarn start:dev

# Verifique a documentação RESTful no browser

http://localhost:3000/api

#OBS: Docker compose será necessário.
```

## Testes

Clique no botão do Insomnia para importas todas as requisições. Caso não o link não abra, o arquivo estará disponibilizado dentro da pasta docs.

O arquivo insomnia conterá a configuração do ambiente de desenvolvimento (dev), localhost, e do ambiente de produção (prod), heroku

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Movies-Repo&uri=https%3A%2F%2Fgithub.com%2Frwellingtonr%2Fmovies-repo-nestjs%2Fblob%2Fmaster%2Fdocs%2FInsomnia_2022-07-15.json)

Assim que a importação for realizada, comece pelo CRUD de categorias dos filmes a serem adicionados posteriormente.

Após feito isso, os filmes podem ser adicionado passando o ID da categoria a qual ele pertence. O CRUD dos filmes irá gerenciar as entidades dos filmes, assim como os de categorias.

## Tecnologias

|  Tecnologias   |        Descrição        | Experiência |
| :------------: | :---------------------: | :---------: |
|   Framework    |         NestJs          |    1 ano    |
| Banco de dados |        Postgres         |   1,5 ano   |
|      ORM       |         TypeOrm         |    1 ano    |
|   Container    |     docker-compose      |   7 meses   |
|  Documentação  |         Swagger         |      -      |
|   Linguagem    | JavaScript (TypeScript) |   1,5 Ano   |
|     Teste      |          Jest           |   3 meses   |
