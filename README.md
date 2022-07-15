# Movies Repository

## Instalação

```bash
# Copiar o diretório
git clone https://github.com/rwellingtonr/movies-repo-nestjs.git

# Abra a pasta
cd movies-repo-nestjs

#Instalação de dependências
yarn

# Rodar os testes (opcional)
yarn test

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

## Tecnologias

|  Tecnologias   |        Descrição        |
| :------------: | :---------------------: |
|   Framework    |         NestJs          |
| Banco de dados |        Postgres         |
|      ORM       |         TypeOrm         |
|   Container    |     docker-compose      |
|  Documentação  |         Swagger         |
|   Linguagem    | JavaScript (TypeScript) |
