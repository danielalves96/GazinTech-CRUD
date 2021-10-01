# Gazin Tech CRUD

![](https://cuponomia-a.akamaihd.net/img/stores/original/gazin-637623691501643205.png)

### EXECUTANDO O PROJETO

### Requisitos
***- Docker e docker compose instalado;***

#### Database 
- **Não precisa rodar!** (Já está instalado e configurado em um host terceiro) - ***(ElephantSQL)***

- Caso queira rodar o banco em abiente local, com o docker e docker-compose instalados em seu ambiente local. Navegua até o diretório` /database` e execute o comando:
`docker-compose up`

- Tendo optado por usar o banco de dados localmente , navegue atá o arquivo .env no diretório /backend e edite as seguintes credenciais com os valores abaixo:
```
PG_HOST=kesavan.db.elephantsql.com
PG_PORT=5432
PG_USER=tybhiyfd
PG_PASSWORD=8tCZnQyZ4LzebNePXrQU6tepL7zgWAxL
PG_DB_NAME=tybhiyfd
```
- Depois execute:
`npm run migrate`

- **Caso vá utilizar o banco de dados já hospedado na ElephantSQL não precisa executar os passos acima.**

#### Backend:

- Para executar o projeto do backend, execute o comando:
`docker-compose up`

 *(Válido para banco de dados local ou já hospedado)*

**Assim seu servidor estára disponível em: http://localhost:3333**

#### Frontend:

- Para executar o projeto do front-end basta apenas executar no diretório /frontend o comando:
`docker-compose up`

**Assim seu servidor do front-end estára disponível em: http://localhost:3000**

- Para conferir as atualizações de banco de dados em alguma IDE como (DataGrip, DBeaver, etc...) Segue as credenciais:

**Banco de dados Hospedado em núvem (default):**
```
HOST=kesavan.db.elephantsql.com
PORT=5432
USER=tybhiyfd
PASSWORD=8tCZnQyZ4LzebNePXrQU6tepL7zgWAxL
DB_NAME=tybhiyfd
```

**Banco de dados local (Caso tenha configurado):**

```
HOST=localhost
PORT=5432
USER=root
PASSWORD=root
DB_NAME=crud_gazin_database
```

### API ENDPOINTS
```
GET /developers
```
Retorna todos os desenvolvedores

```
GET /developers?page=1
```
Retorna os desenvolvedores de acordo com o termo passado via querystring e
paginação

```
GET /developers/{id}
```
Retorna os dados de um desenvolvedor

```
POST/developers/{id}
```
Adiciona um novo desenvolvedor

```
PUT/developers/{id}
```
Atualiza os dados de um desenvolvedor

```
DELETE/developers/{id}
```
Apaga o registro de um desenvolvedor

