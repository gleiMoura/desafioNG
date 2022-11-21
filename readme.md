<p align="center">
  <img  src="https://st2.depositphotos.com/1001599/7044/v/450/depositphotos_70449587-stock-illustration-calculator-thin-line-icon.jpg"
    width="200px" height="200px" >
</p>
<h1 align="center">
  DESAGIO NG.CASH
</h1>
<div align="center">

  <h3>Built With:</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
	<img src="https://img.shields.io/badge/docker-404D59?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>
	
</div>

<br/>

# Description

DESAFIO NG.CASH is a financial aplication, whose purpose is to enable NG users to be able to carry out internal transfers between themselves.

</br>

## Features

-   Create an account
-   Enter in account
-   Get balance account
-   Do cash-out to another account
-   Get all transactions
-   Get transactions by Date
-   Get cash-out transactions by date
-   Get cash-in transactions by date

</br>

## API Reference

#### SignUp

```http
POST /signUp
```

#### Request:

| Body              | Type     | Description                                                         |
| :---------------- | :------- | :------------------------------------------------------------------ |
| `username`        | `string` | **Required**. valid unique with at least 3 characters username      |
| `password`        | `string` | **Required**. password with at least 8 characters                   |


#

#### SignIn

```http
POST /signin
```

#### Request:

| Body       | Type     | Description                         |
| :--------- | :------- | :-----------------------------------|
| `username` | `string` | **Required**. valid username        |
| `password` | `string` | **Required**. valid password              |

</br>

#### Response:

```json
{
	"token": "jsonwebtoken"
}
```

<br/>

# Authorization headers

| Headers         | Type     | Description               |
| :-------------- | :------- | :------------------------ |
| `Authorization` | `string` | **Required**. valid token |

`Authorization format: Bearer jsonwebtoken`

**All following routes request authorization header**

<br/>

# Balance

#### Get balance associated with the user by token

```http
Get /balance
```

#### Response:

```json
number
```


#### Do cash out in user account to another client

```http
POST /cashOut
```

#### Request:

| Params | Type       | Description                                  |
| :----- | :--------- | :--------------------------------------------|
| `value`   | `float` | **Required**. valid value present in account |

<br/>

#### Response:

```json
{
  "value": 20,
  "debitedUsername": "João",
  "creditedUsername": "Jeferson",
  "creditedAccountId": 2,
  "debitedAccountId": 1,
  "createdAt": "19/11/2022 12:27:31"
}
```

# Transactions

#### get All transactions from a client by token

```http
POST /getTransactions
```


#### Response:

```json
{
  "creditedTransactions": [
    {
      "value": 20,
      "createdAt": "19/11/2022 12:27:31",
      "debitedAccountId": 1,
      "creditedAccountId": 2,
      "debitedAccount": {
        "users": [
          {
            "username": "João"
          }
        ]
      },
      "creditedAccount": {
        "users": [
          {
            "username": "Jeferson"
          }
        ]
      }
    }
  ],
  "debitedTransactions": [
    {
      "value": 1,
      "createdAt": "18/11/2022 19:23:20",
      "debitedAccountId": 2,
      "creditedAccountId": 1,
      "debitedAccount": {
        "users": [
          {
            "username": "Jeferson"
          }
        ]
      },
      "creditedAccount": {
        "users": [
          {
            "username": "João"
          }
        ]
      }
    }
	]
}
```

#

#### Get transactions by date

```http
GET /getTransactions/byDate
```
#### Request:

| Params | Type                                | Description              |
| :----- | :-----------------------------------| :------------------------|
| `date`   | `string` (format "DD/MM/YYY")     | **Required**. valid date |

<br/>

#### Response:

```json
{
  "debitedTransactions": [
    {
      "value": 1,
      "createdAt": "18/11/2022 19:23:20",
      "debitedAccountId": 2,
      "creditedAccountId": 1,
      "debitedAccount": {
        "users": [
          {
            "username": "Jeferson"
          }
        ]
      },
      "creditedAccount": {
        "users": [
          {
            "username": "João"
          }
        ]
      }
    }
  ],
  "creditedTransactions": []//There isn't transactions in this date
}
```

#

#### get cash input transactions by date

```http
GET /getTransactions/byDate/cashIn
```

#### Request:

| Params | Type                                | Description              |
| :----- | :-----------------------------------| :------------------------|
| `date`   | `string` (format "DD/MM/YYY")     | **Required**. valid date |

<br/>

#### Response:

```json
[
  {
    "value": 20,
    "createdAt": "19/11/2022 12:27:31",
    "debitedAccountId": 1,
    "creditedAccountId": 2,
    "debitedAccount": {
      "users": [
        {
          "username": "João"
        }
      ]
    },
    "creditedAccount": {
      "users": [
        {
          "username": "Jeferson"
        }
      ]
    }
  }
]
```

#

#### get cash output transactions by date

```http
GET /getTransactions/byDate/cashOut
```

#### Request:

| Params | Type                                | Description              |
| :----- | :-----------------------------------| :------------------------|
| `date`   | `string` (format "DD/MM/YYY")     | **Required**. valid date |

<br/>

#### Response:

```json
[
  {
    "value": 1,
    "createdAt": "19/11/2022 11:54:29",
    "debitedAccountId": 2,
    "creditedAccountId": 1,
    "debitedAccount": {
      "users": [
        {
          "username": "Jeferson"
        }
      ]
    },
    "creditedAccount": {
      "users": [
        {
          "username": "João"
        }
      ]
    }
  }
]
```

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

Hostname can be to docker-compose file "db" or, to work in machine, "localhost:5432";

`PORT = 4000`

`POSTGRES_USER=UserName`

`POSTGRES_PASSWORD=Password`

`POSTGRES_DB=DatabaseName`

`SECRET = AnyString`

`PORT = number #recommended:4000`

`SECRET = any string`

</br>

## Run Locally

upload the application's docker container

```bash
  npm run docker:up
```

if you want to run directly on your machine without docker

```bash
  npm i
```

then

```bash
  npx prisma migrate dev
```

finally

```bash
  npm run dev
```


</br>

## How to test the aplication with THUNDER CLIENT

--> Go in "collections"

--> Click in the "Menu" at right side

--> Click in "import" 

--> Choose the file with name "thunder-collection_desafioNG.json"

--> Start to test

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   [@gleiMoura](https://www.github.com/gleiMoura) 🪐

<br/>
<br/>
<br/>

#

<a  href="https://www.linkedin.com/in/gleison-moura-794793220/" target="_blank"><img src="https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg"></a>