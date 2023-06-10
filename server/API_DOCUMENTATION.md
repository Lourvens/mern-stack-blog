# API Documentation

## Introduction

Welcome to the API documentation for my blog! This API provides various endpoints to interact with our system and access its features. Below, you will find detailed information on each endpoint and its available functionalities.

API Base URL: `https://lourvens-blog-api.onrender.com`

### Endpoint: `/auth`

The authentication endpoint provides functionality for user authentication.

#### `POST /auth/signup`

Registers a new user with the provided credentials.

#### Request

- Method: POST
- Body:

```json
{
  "fullname": "Jhon Doe",
  "email": "jhondoe@example.com",
  "passowrd": "1234"
}
```

#### Response

- `201 Created` if the user was successfully registered.
- `400 Bad Request` if the request payload is invalid.
- `409 Conflict` if a user with the same email already exists.

#### `POST /auth/login`

Authenticates a user with the provided credentials and returns an access token.

#### Request

- Method: POST
- Body:

```json
{
  "email": "jhondoe@example.com",
  "passowrd": "1234"
}
```

#### Response

- `200 OK` if the user is successfully authenticated it will set a cookie token, with the following response payload:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE2MzQxNTc3NTZ9.kzRtX5aSQYOmvXnz1Gw_dMzPbOn9ZlKdUhk_vMgcZwU"
}
```

- `401 Unauthorized` if the user credentials are invalid.

#### `POST /auth/refresh-token`

Generates a new access token using a refresh token that will expire in 15 minutes

#### Request

- Method: POST

#### Request

- `200 OK` if the private token stored in the cookie is valid and a new acces token is generated, with the following response payload

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE2MzQxNTc3NTZ9.kzRtX5aSQYOmvXnz1Gw_dMzPbOn9ZlKdUhk_vMgcZwU"
}
```

- `401 Unauthorized` if the private token is invalid or expired.

#### POST /auth/logout

Logs out the user and remove their private token stored as a cookie.

#### Response

- `204 No-Content`

### Endpoint: `/article`

The articles endpoint provides functionality for managing blog articles.

#### `GET /article?page=<number>`

Retrieves a list of 10 articles.

#### Response

- `200 Ok` if the request is successful, with the following response payload:

```json
[{ _id: }]
```
