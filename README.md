# Bonz AI API Documentation

## Overview

This project provides a serverless API for managing reservations and rooms using AWS Lambda, DynamoDB, and API Gateway.

## Table of Contents

- [Bonz AI API Documentation](#bonz-ai-api-documentation)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Endpoints](#endpoints)
    - [Reservations](#reservations)
    - [Rooms](#rooms)
    - [Base URLs to use](#base-urls-to-use)
  - [Example Requests](#example-requests)
    - [Create a Room](#create-a-room)
    - [Get all Rooms](#get-all-rooms)
    - [Create a Reservation](#create-a-reservation)
    - [Get a Reservation by ID](#get-a-reservation-by-id)
    - [Delete a Reservation](#delete-a-reservation)
  - [Error Handling](#error-handling)
    - [Example Error Response](#example-error-response)
  - [Environment Variables](#environment-variables)

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

### Base URLs to use

- [Rooms](https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/rooms) - GET, POST
- [Rooms(with ID)](https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/rooms/{id}) - GET, PUT, DELETE
- [Reservations](https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/reservations) - GET, POST
- [Reservations](https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/reservations/{id}) - GET, PUT, DELETE

## Example Requests

### Create a Room

- **Method**: POST
- **URL**: `https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/rooms`
- **Headers**: `Content-Type: application/json`
- **Body**:
  
```json
{
        "roomType": "Svit",
        "price": 1500,
        "bedsInRoom": 3,
        "roomNumber": "306" //needs to be unique
}
```

- **Response:**
  
  ```json
  {
    "roomType": "Svit",
    "price": 1500,
    "bedsInRoom": 3,
    "roomNumber": "306",
    "isAvaliable": true
  }
  ```

### Get all Rooms

- **Method**: POST
- **URL**: `https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/rooms`
- **Headers**: `Content-Type: application/json`

### Create a Reservation

- **Method**: POST
- **URL**: `https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/reservations`
- **Headers**: `Content-Type: application/json`

### Get a Reservation by ID

- **Method**: GET
- **URL**: `https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/reservations/{id}`

### Delete a Reservation

- **Method**: DELETE
- **URL**: `https://pmodf0kb91.execute-api.eu-north-1.amazonaws.com/reservations/{id}`

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

The API uses the following environment variables (configurable in `serverless.yml` through creating `local.yml` in root map and put variables inside):

- **organisation**: this variable ensures this Service is used with the correct Serverless Framework Access Key.
- **iamRole**: this variable ensures this Service has the correct IAM Role.
