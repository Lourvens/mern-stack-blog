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

Logs out the user and remove his private token stored in the cookie storage.

#### Response

- `204 No-Content`

### Endpoint: `/articles`

The articles endpoint provides functionality for managing blog articles.

#### `GET /articles?page=<number>`

Retrieves a list of 10 articles.

#### Response

- `200 Ok` if the request is successful, with the following response payload:

```json
[
  {
    "_id": "6485e5cdfbc7e729f79",
    "title": "title of this article here",
    "content": "lorem ipsum doler sit amet consector",
    "img_path": "cover_example.png" // GET /assets/blog/cover_example.png
    "author": {
      "_id": "64736dd5e2cfc0268a3030fe",
      "fullname": "Jhon Doe",
      "email": "jhondoe@example.com"
    },
    "createdAt": "2023-01-11T15:18:37.473Z",
    "updatedAt": "2023-03-11T15:18:37.473Z"
  },
]
```

#### `GET /articles/:id`

Retrieves a specific article with more details.

#### Response

- `200 Ok` if the request is successful, with the following response payload:

```json
{
  "_id": "6485e5cdfbc7e729f79",
  "title": "title of this article here",
  "content": "lorem ipsum doler sit amet consector",
  "img_path": "cover_example.png" // GET /assets/blog/cover_example.png
  "author": {
    "_id": "64736dd5e2cfc0268a3030fe",
    "fullname": "Jhon Doe",
    "email": "jhondoe@example.com"
  },
  "comments": [{
      "author": {
        "_id": "64736d63e2cfc0268a3039f7",
        "fullname": "Darby Phillip",
        "profile_picture": "darby.jpg" // GET /assets/avatar/darby.jpg
      },
      "content": "Just an example",
      "_id": "6485e884fbc7e729f79bcf61"
    }
  ],
  "createdAt": "2023-01-11T15:18:37.473Z",
  "updatedAt": "2023-03-11T15:18:37.473Z"
}
```

#### `POST /articles/`

create a new article

#### Request

- Method: POST
- content-type: multipart/form-data
- Body:

```json
{
  "title": "title here",
  "content": "article content here",
  "cover": <blog_img.png> // provide a valid image file for the cover img of the article
}
```

#### Response

- `201 Created` if the article was successfully created.
- `400 Bad Request` if the request payload is invalid.
- `401 Unauthorized` if the user credentials are invalid.

#### `DELETE /articles/:article-id`

#### Response

- `200 Ok` if the article was successfully deleted.
- `401 Unauthorized` if the user credentials are invalid.
- `403 Forbbiden` if the user isn't the owner of the article.

#### `POST /articles/:article-id/comments`

add a new comment to an article

#### Request

- Method: POST
- Body:

```json
{
  "content": "this is a comment"
}
```

#### Response

- `201 Created` if the comment was successfully added.
- `400 Bad Request` if the request payload is invalid.
- `401 Unauthorized` if the user credentials are invalid.

#### `PUT /articles/:article-id/comments/:id`

Update the content of a comment

#### Request

- Method: PUT
- Body:

```json
{
  "content": "this is a comment"
}
```

#### Response

- `200 Ok` if the comment was successfully modified.
- `400 Bad Request` if the request payload is invalid.
- `401 Unauthorized` if the user credentials are invalid.
- `403 Forbbiden` if the user isn't the owner of the comment.

#### `DELETE /articles/:article-id/comments/:id`

#### Response

- `200 Ok` if the comment was successfully deleted.
- `401 Unauthorized` if the user credentials are invalid.
- `403 Forbbiden` if the user isn't the owner of the comment.

### Endpoint: `/users`

The articles endpoint provides functionality for managing user information

#### `GET /users/:id`

Retrieves a specific article with more details.

#### Response

- `200 Ok` if the request is successful, with the following response payload:

```json
{
  "_id": "64736d63e2cfc0268a203",
  "fullname": "Jhon Doe",
  "email": "jhondoe@example.com",
  "profile_picture": "0970fb4e-3ed4-4eef.jpg"
}
```

#### `(POST | PUT) /user/avatar`

update profile picture

#### Request

- Method: POST | PUT
- content-type: multipart/form-data
- Body:

```json
{
  "avatar": <profile_picture.png>
}
```
