# Bonz AI API Documentation

## Overview

This project provides a serverless API for managing reservations and rooms using AWS Lambda, DynamoDB, and API Gateway.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Endpoints](#endpoints)
   - [Reservations](#reservations)
   - [Rooms](#rooms)
3. [Example Requests](#example-requests)
   - [Create a Reservation](#create-a-reservation)
   - [Get a Reservation by ID](#get-a-reservation-by-id)
   - [Delete a Reservation](#delete-a-reservation)
4. [Error Handling](#error-handling)
5. [Environment Variables](#environment-variables)
6. [Deployment](#deployment)

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14.x or later recommended).
- **AWS CLI**: Configure your AWS CLI with appropriate access permissions.
- **Serverless Framework**: Install the Serverless Framework globally using `npm install -g serverless`.

## Endpoints

### Reservations

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/reservations`              | Create a new reservation.        |
| GET    | `/reservations`              | Get all reservations.            |
| GET    | `/reservations/{id}`         | Get a reservation by ID.         |
| PUT    | `/reservations/{id}`         | Update a reservation by ID.      |
| DELETE | `/reservations/{id}`         | Delete a reservation by ID.      |

### Rooms

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/rooms`                     | Create a new room.               |
| GET    | `/rooms`                     | Get all rooms.                   |
| GET    | `/rooms/{id}`                | Get a room by ID.                |
| PUT    | `/rooms/{id}`                | Update a room by ID.             |
| DELETE | `/rooms/{id}`                | Delete a room by ID.             |

## Example Requests

### Create a Reservation

- **Method**: POST
- **URL**: `https://bmbx799vwi.execute-api.eu-north-1.amazonaws.com/reservations`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "pk": "jkba7y",
    "sk": "reservation",
    "object": {
      "checkIn": true,
      "checkOut": "404",
      "amountOfGuests": 3,
      "chosenRooms": [
        "854279",
        "98ahj1"
      ],
      "firstName": "Förnamn",
      "lastName": "Efternamn",
      "email": "mail@tillperson.com"
    }
  }

### Get a Reservation by ID

- **Method**: GET
- **URL**: `https://bmbx799vwi.execute-api.eu-north-1.amazonaws.com/reservations/{id}`

### Delete a Reservation

- **Method**: DELETE
- **URL**: `https://bmbx799vwi.execute-api.eu-north-1.amazonaws.com/reservations/{id}`

## Error Handling

Errors are returned as JSON responses with HTTP status codes:

- **400**: Bad request (e.g., missing data).
- **404**: Resource not found (e.g., reservation not found).
- **500**: Internal server error (e.g., unexpected issues).

### Example Error Response
- **Body**:
  ```json
  {
  "statusCode": 404,
  "message": "Reservation ID {id} not found"
  }

## Environment Variables

The API uses the following environment variables (configurable in `serverless.yml`):

- **AWS_REGION**: AWS region for deployment (default: `eu-north-1`).
- **DYNAMODB_TABLE**: DynamoDB table name (default: `bonz-ai-db`).

## Deployment

To deploy the API, use the following command in your terminal:

serverless deploy

After deployment, you will receive the endpoints for accessing your API functions.

## Testing the API

You can test the API using tools like Postman or cURL.

## Additional Notes

Ensure that all IAM roles and permissions are correctly configured in AWS to allow the Lambda functions to interact with DynamoDB as defined in the `serverless.yml` configuration.

---

Feel free to reach out if you encounter any issues or need further assistance with the setup or API functionality!
