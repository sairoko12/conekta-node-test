# Ejemplos uso de api Restful node

--- 

## Requisitos

1. Mongo
2. Node
3. NPM
4. Redis

## Secuencia comandos

1. npm install


## Generar cliente para cosumo de la API
---
**POST /clients** Parametros: [client_id: "foo", client_secret: "bar"]

## Flujo para consumir API

1. **POST /auth** Parametros: [client_id: "foo", client_secret: "bar"]
2. **POST /token** Parametros: [token: 'token generado', number: "4242 4242 4242 4242", exp_month: "06", exp_year: "2017", cvc: "321"]
3. **POST /charges** Parametros: [token: 'token generado', amount: 1501, description: "Test description."]

#### El token puede ir por parametro, query o en header[x-access-token]
