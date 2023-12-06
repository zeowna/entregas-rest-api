# TCC 2 - UFPR

## Alunos

José Lucas Alves dos Santos Chociai

Lucas Wunderlich

## Orientador

Prof. Dr. Dieval Guizelini

## Projeto

Esse repositório versiona a Rest API do Entregas

## Instalação

```bash
$ yarn install
```

## Rodando a aplicação

```bash
# desenvolvimento
$ yarn run start

# watch mode
$ yarn run start:dev

# produção
$ yarn run build
$ yarn run start:prod

# local dentro do Docker
$ docker compose up api
```

## Migrações do Banco de Dados

```bash
# sincronizar migrações do Banco de Dados
$ yarn migration:run

# sincronizar migrações do Banco de Dados local dentro do Docker
$ docker compose exec api yarn migration:run
```
