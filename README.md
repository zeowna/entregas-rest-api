# TCC 2 - UFPR

## Alunos

José Lucas Alves dos Santos Chociai

Lucas Wunderlich

## Orientador

Prof. Dr. Dieval Guizelini

## Projeto

Esse repositório versiona a Rest API do Entregas

## Instalaçao

```bash
$ yarn install
```

## Rodando a aplicação

```bash
# desenvolvimento
$ yarn run start

# watch mode
$ yarn run start:dev

# produçãp
$ yarn run start:prod

# local dentro do Docker
$ docker compose up api
```

## Migratioins do Banco de Dados

```bash
# sincronizar mirations
$ yarn migration:run

# sincronizar mirations local dentro do Docker
$ docker compose exec api yarn migration:run
```
