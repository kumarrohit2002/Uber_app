# Backend API Documentation

---

## **Register User API**

### **Endpoint:** `/users/register`

### **HTTP Method:** `POST`

### **Description:**  
This endpoint allows users to register by providing their first name, last name, email, and password. The system validates the input data, securely hashes the password, stores the user's details in the database, and generates a JSON Web Token (JWT) upon successful registration.

---

### **Request Format:**

#### **Headers:**
- **Content-Type:** `application/json`

#### **Body (JSON):**
```json
{
  "fullname": {
    "firstname": "string (required, minLength: 3)",
    "lastname": "string (optional, minLength: 3)"
  },
  "email": "string (required, valid email format)",
  "password": "string (required, minLength: 6)"
}
```

---

### **Validation Rules:**

- **`fullname.firstname`:**
  - Required
  - Must be at least 3 characters long.

- **`fullname.lastname`:**
  - Optional
  - Must be at least 3 characters long if provided.

- **`email`:**
  - Required
  - Must be in a valid email format.

- **`password`:**
  - Required
  - Must be at least 6 characters long.

---

### **Response Format:**

#### **Successful Response:**
- **Status Code:** `201 Created`  
- **Description:** User is registered successfully. Returns the user's details and a JWT token.

```json
{
  "token": "string (JWT Token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "hashed string",
    "socketId": null
  }
}
```

#### **Error Response:**
- **Status Code:** `400 Bad Request`  
- **Description:** Validation errors in the request.

```json
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## **Login User API**

### **Endpoint:** `/users/login`

### **HTTP Method:** `POST`

### **Description:**  
This endpoint allows registered users to log in by providing their email and password. If the credentials are valid, the system generates and returns a JSON Web Token (JWT) along with user details.

---

### **Request Format:**

#### **Headers:**
- **Content-Type:** `application/json`

#### **Body (JSON):**
```json
{
  "email": "string (required, valid email format)",
  "password": "string (required)"
}
```

---

### **Validation Rules:**

- **`email`:**
  - Required
  - Must be in a valid email format.

- **`password`:**
  - Required

---

### **Response Format:**

#### **Successful Response:**
- **Status Code:** `200 OK`  
- **Description:** User logged in successfully. Returns a JWT token and user details.

```json
{
  "token": "string (JWT Token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  }
}
```

#### **Error Response:**
- **Status Code:** `401 Unauthorized`  
- **Description:** Invalid email or password.

```json
{
  "message": "Invalid email or password",
  "success": false
}
```

---

## **Get User Profile API**

### **Endpoint:** `/users/profile`

### **HTTP Method:** `GET`

### **Description:**  
Retrieves the profile of the currently authenticated user. The user's token is validated before the profile data is returned.

---

### **Request Format:**

#### **Headers:**
- **Authorization:** `Bearer <JWT token>`

---

### **Response Format:**

#### **Successful Response:**
- **Status Code:** `200 OK`  
- **Description:** Returns the authenticated user's profile information.

```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  }
}
```

#### **Error Response:**
- **Status Code:** `401 Unauthorized`  
- **Description:** Token is missing, invalid, or expired.

```json
{
  "message": "Unauthorized"
}
```

---

## **Logout User API**

### **Endpoint:** `/users/logout`

### **HTTP Method:** `POST`

### **Description:**  
Logs out the user by clearing the authentication token from cookies and adding it to a blacklist to prevent further use.

---

### **Request Format:**

#### **Headers:**
- **Authorization:** `Bearer <JWT token>`

#### **Cookies:**
- **token:** `<JWT token>`

---

### **Response Format:**

#### **Successful Response:**
- **Status Code:** `200 OK`  
- **Description:** User logged out successfully.

```json
{
  "message": "Logged out successfully",
  "success": true
}
```

#### **Error Response:**
- **Status Code:** `500 Internal Server Error`  
- **Description:** Logout process failed due to server-side issues.

```json
{
  "message": "Logout failed",
  "success": false
}
```

- **Status Code:** `401 Unauthorized`  
- **Description:** Token is missing or invalid.

```json
{
  "message": "Unauthorized"
}
```

---

### **Notes:**
- Blacklisted tokens automatically expire after 24 hours.
- Ensure the JWT token is sent in the `Authorization` header or `token` cookie for authentication and logout.