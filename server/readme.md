# !Alert this documentation hasn't completed yet!

# My Blog - RESTful API Documentation

## Introduction

Welcome to the documentation for my Blog RESTful API. This API provides a set of endpoints to interact with our application and perform various operations. This document serves as a guide for developers who want to integrate with our API.

## API Base URL

The base URL for all API endpoints is `https://api.example.com/v1/`.

## Authentication

All requests to the API must be authenticated using an API key. To authenticate, include the `Authorization` header in your request with the value `Bearer {api_key}`.

## Error Handling

If an error occurs while processing a request, the API will return an appropriate HTTP status code along with a JSON response containing an `error` field with a descriptive error message.

## Endpoints

The following table provides an overview of the available API endpoints:

| Endpoint                           | Method | Description                 | access             |
| ---------------------------------- | ------ | --------------------------- | ------------------ |
| `/auth/signup`                     | POST   | Create a new user.          | any                |
| `/auth/login`                      | POST   | login a user.               | any                |
| `/auth/logout`                     | POST   |                             | any                |
| `/auth/refresh`                    | POST   |                             | autheticated user  |
| `/article?step=<number>`           | GET    | Retrieve 10 articles        | any                |
| `/article/:article_id`             | GET    | Retrieve a specific article | any                |
| `/article/:article_id/comment`     | POST   | Create a new comment        | authenticated user |
| `/article/:article_id/comment/:id` | PUT    | Update an existing comment  | only same user     |
| `/article/:article_id/comment/:id` | DELETE | Remove an existing comment  | only same user     |

## Getting Started

To get started with the API, follow these steps:

1. Create an account or login to an account
2.
3. Include the API key in the `Authorization` header of your API requests.
4. Refer to the API Documentation for information on how to make requests to each endpoint and interpret the responses.
