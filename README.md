# Contact Management API

## Overview

This project is a simple **Contact Management API** built using **Node.js**, **Express.js**, and **SQLite**. It provides RESTful endpoints for managing contacts, including operations to create, read, update, and delete contacts.

---

## Features

- **SQLite** database for storing contact information
- **RESTful API** with CRUD operations
- **Express.js** as the backend framework
- **CORS support** for cross-origin requests
- **Data validation** for improved reliability
- **Error handling** for robustness

---

## Technologies Used

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **Cors** - Middleware for handling cross-origin requests
- **SQLite3 & SQLite** - Database driver

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **SQLite3** (comes bundled with Node.js SQLite3 package)

---

## Installation & Setup

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/contact-management-api.git
cd contact-management-api
```

### 2. Install dependencies

```sh
npm install
```

### 3. Initialize the database

```sh
node setupDatabase.js  # Optional: If you have a separate script for table creation
```

### 4. Start the server

```sh
node index.js  # or use nodemon for development
```

Server will be running at `http://localhost:3000`.

---

## Database Schema (SQLite)

The `contacts` table is structured as follows:

```sql
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT
);
```

---

## API Endpoints

### 1. **Get All Contacts**

- **Endpoint:** `GET /contacts`
- **Response:**

```json
[
  {
    "id": 1,
    "name": "rama",
    "email": "rama@example.com",
    "phone_number": "1234567890",
    "address": "123 Main St"
  }
]
```

### 2. **Get a Single Contact**

- **Endpoint:** `GET /contacts/:id`
- **Response:**

```json
{
  "id": 1,
  "name": "rama",
  "email": "rama@example.com",
  "phone_number": "1234567890",
  "address": "123 Main St"
}
```

### 3. **Add a Contact**

- **Endpoint:** `POST /contacts`
- **Request Body:**

```json
{
  "name": "sita",
  "email": "sita@example.com",
  "phoneNumber": "9876543210",
  "address": "456 Elm St"
}
```

- **Response:**

```json
{ "message": "Contact added successfully" }
```

### 4. **Update a Contact**

- **Endpoint:** `PUT /contacts/:id`
- **Request Body:**

```json
{
  "name": "sita rama",
  "email": "siataram@example.com",
  "phoneNumber": "9876543210",
  "address": "789 Oak St"
}
```

- **Response:**

```json
{ "message": "Contact updated successfully" }
```

### 5. **Delete a Contact**

- **Endpoint:** `DELETE /contacts/:id`
- **Response:**

```json
{ "message": "Contact deleted successfully" }
```

### 6. **Search Contacts**

- **Endpoint:** `GET /contacts?name=rama&email=rama@gmail.com`
- **Response:**

```json
[
  {
    "id": 1,
    "name": "rama",
    "email": "rama@example.com",
    "phone_number": "1234567890",
    "address": "123 Main St"
  }
]
```

---

## Error Handling

- **400 Bad Request**: If required fields are missing.
- **404 Not Found**: If a requested contact ID does not exist.
- **500 Internal Server Error**: If a server error occurs.

---

## License

This project is open-source and available under the **MIT License**.

---

## Author

**Your Name**  
GitHub: [yourusername](https://github.com/yourusername)  
LinkedIn: [yourprofile](https://linkedin.com/in/yourprofile)
