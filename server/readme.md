# Project Name - RESTful API Documentation

## Introduction

Welcome to the documentation for the Blog RESTful API! This API provides functionality for managing a blog, including authentication, user management, and article management. Below, you will find detailed information on each endpoint and its available functionalities.

## API Base URL

API Base URL: `https://lourvens-blog-api.onrender.com`

## Error Handling

If an error occurs while processing a request, the API will return an appropriate HTTP status code along with a JSON response containing an `error` field with a descriptive error message.

## Endpoints

The following table provides an overview of the available API endpoints:

| Endpoint                 | Method | Description                                  |
| ------------------------ | ------ | -------------------------------------------- |
| `/users`                 | POST   | Create a new user.                           |
| `/article?page=<number>` | GET    | Retrieve a list of 10 article in the system. |
| `/article/{id}`          | GET    | Retrieve details for a specific article.     |

For detailed information about each endpoint, including request and response examples, please refer to the [API Documentation](API_DOCUMENTATION.md).

## Getting Started

To get started with the API, follow these steps:

1. Refer to the API Documentation for information on how to make requests to each endpoint and interpret the responses.

2. Include the API key in the `Authorization` header of your API requests when you mutate details.

## API Documentation

For detailed information about each endpoint, including request and response examples, please refer to the [API Documentation](API_DOCUMENTATION.md) file.
