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
---




## **Register Captain API**

### Endpoint Documentation: **`/captain/register`**

#### **Description**:
This endpoint allows new captains to register by providing their personal details, vehicle information, and password. Upon successful registration, a JWT token is generated and returned along with the captain's information.

---

### **HTTP Method**:
`POST`

---

### **URL**:
`/captain/register`

---

### **Request Headers**:
| Header Name      | Type   | Description              |
|------------------|--------|--------------------------|
| `Content-Type`   | String | Must be `application/json`. |

---

### **Request Body**:
The request body must be in JSON format with the following fields:

#### **Schema**:
```json
{
    "fullname": {
        "firstname": "string (minLength: 3, required)",
        "lastname": "string (minLength: 3)"
    },
    "email": "string (valid email format, required)",
    "password": "string (minLength: 6, required)",
    "vehicle": {
        "color": "string (minLength: 3, required)",
        "plate": "string (minLength: 3, required)",
        "capacity": "integer (min: 1, required)",
        "vehicleType": "enum: ['car', 'motorcycle', 'auto'] (required)"
    }
}
```

#### **Example**:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "vehicle": {
        "color": "Blue",
        "plate": "AB1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

---

### **Response**:

#### **Success (201)**:
If the registration is successful, the API responds with a JWT token and the captain's information.

##### **Example**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "64fbcbf0c4e88f3d6c1e2e5e",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "AB1234",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive"
    }
}
```

---

#### **Error Responses**:

1. **Validation Error (400)**:
   - **Reason**: The input data did not pass validation checks.
   - **Example**:
     ```json
     {
         "errors": [
             { "msg": "First name must be at least 3 characters", "param": "fullname.firstname", "location": "body" },
             { "msg": "Invalid Email", "param": "email", "location": "body" }
         ]
     }
     ```

2. **Email Already Registered (409)**:
   - **Reason**: The email is already associated with an existing captain.
   - **Example**:
     ```json
     {
         "message": "Email Already Registered",
         "success": false
     }
     ```

3. **Server Error (500)**:
   - **Reason**: An internal server error occurred.
   - **Example**:
     ```json
     {
         "message": "Internal Server Error",
         "success": false
     }
     ```

---

### **Validation Rules**:
- **Email**: Must be a valid email format.
- **First Name**: Minimum of 3 characters.
- **Password**: Minimum of 6 characters.
- **Vehicle Color**: Minimum of 3 characters.
- **Vehicle Plate**: Minimum of 3 characters.
- **Vehicle Capacity**: Must be an integer greater than or equal to 1.
- **Vehicle Type**: Must be one of `['car', 'motorcycle', 'auto']`.

---

### **Implementation Notes**:
- **Security**: Ensure the `JWT_SECRET` environment variable is set securely.
- **Password Hashing**: Passwords are hashed before being stored in the database.
- **Token Expiry**: Tokens are valid for 24 hours.

---

### **Developer Tips**:
- Test validation rules thoroughly using invalid input.
- Ensure email uniqueness by properly indexing the `email` field in the database.
- Handle potential duplicate requests gracefully to prevent duplicate captain entries.

---


## Endpoint Documentation: **`/captain/login`**

#### **Description**:
This endpoint allows captains to log in by providing their registered email and password. Upon successful login, a JWT token is generated and returned along with the captain's information. The token is also set in a cookie for subsequent requests.

---

### **HTTP Method**:
`POST`

---

### **URL**:
`/captain/login`

---

### **Request Headers**:
| Header Name      | Type   | Description              |
|------------------|--------|--------------------------|
| `Content-Type`   | String | Must be `application/json`. |

---

### **Request Body**:
The request body must be in JSON format with the following fields:

#### **Schema**:
```json
{
    "email": "string (valid email format, required)",
    "password": "string (minLength: 6, required)"
}
```

#### **Example**:
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

---

### **Response**:

#### **Success (200)**:
If the login is successful, the API responds with a JWT token, sets the token in a cookie, and returns the captain's information.

##### **Example**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "64fbcbf0c4e88f3d6c1e2e5e",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "AB1234",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "active"
    }
}
```

---

#### **Error Responses**:

1. **Validation Error (400)**:
   - **Reason**: Input data did not pass validation checks.
   - **Example**:
     ```json
     {
         "errors": [
             { "msg": "Invalid Email", "param": "email", "location": "body" },
             { "msg": "Password must be at least 6", "param": "password", "location": "body" }
         ],
         "success": false
     }
     ```

2. **User Not Found (404)**:
   - **Reason**: No captain is registered with the provided email.
   - **Example**:
     ```json
     {
         "message": "User not found",
         "success": false
     }
     ```

3. **Invalid Credentials (401)**:
   - **Reason**: The provided password does not match the stored password.
   - **Example**:
     ```json
     {
         "message": "Invalid email or password",
         "success": false
     }
     ```

4. **Server Error (500)**:
   - **Reason**: An internal server error occurred.
   - **Example**:
     ```json
     {
         "message": "Internal server Error",
         "success": false
     }
     ```

---

### **Validation Rules**:
- **Email**: Must be a valid email format.
- **Password**: Minimum of 6 characters.

---

### **Implementation Notes**:
- **Password Verification**: Passwords are compared using `bcrypt.compare()` to ensure security.
- **JWT Token**: The token is signed using a secret key defined in the environment variable `JWT_SECRET` and expires in 24 hours.
- **Cookies**: The JWT token is set in a cookie named `token`.

---

### **Developer Tips**:
- Ensure proper validation for both `email` and `password` to avoid invalid requests.
- Use secure HTTP headers when sending cookies (`httpOnly`, `secure`, etc.).
- Handle expired tokens gracefully in subsequent requests.
---

## Endpoint Documentation: **`/captain/profile`**

#### **Description**:
This endpoint allows an authenticated captain to retrieve their profile details. The captain's authentication is verified using a JWT token.

---

### **HTTP Method**:
`GET`

---

### **URL**:
`/captain/profile`

---

### **Authentication**:
This endpoint requires a valid JWT token. The token can be passed in one of the following ways:
1. **Cookie**: A cookie named `token`.
2. **Authorization Header**: A bearer token in the `Authorization` header (`Bearer <token>`).

---

### **Request Headers**:
| Header Name          | Type   | Description                                         |
|----------------------|--------|-----------------------------------------------------|
| `Authorization`      | String | `Bearer <JWT Token>` (optional if token is in a cookie). |
| `Content-Type`       | String | Must be `application/json`.                        |

---

### **Request Parameters**:
None

---

### **Response**:

#### **Success (200)**:
If the request is authenticated, the server responds with the captain's profile information.

##### **Example**:
```json
{
    "captain": {
        "_id": "64fbcbf0c4e88f3d6c1e2e5e",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "AB1234",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "active"
    },
    "success": true
}
```

---

#### **Error Responses**:

1. **Unauthorized (401)**:
   - **Reason**: Token is missing, invalid, or blacklisted.
   - **Example**:
     ```json
     {
         "message": "Unauthorized"
     }
     ```

2. **Server Error (500)**:
   - **Reason**: An unexpected error occurred.
   - **Example**:
     ```json
     {
         "message": "Internal server error"
     }
     ```

---

### **Middleware**:
- **`authCaptain`**:
  - Extracts the token from the cookie or authorization header.
  - Validates the token and checks if it has been blacklisted.
  - Retrieves the captain's profile using the token's payload (`_id`).
  - Attaches the captain's data to `req.captain`.

---

### **Validation**:
- Token must be a valid JWT signed with the secret defined in `process.env.JWT_SECRET`.
- Blacklisted tokens are rejected to prevent unauthorized access.

---

### **Developer Notes**:
- Ensure the blacklist functionality (`blackListTokenModel`) is maintained to revoke tokens when required.
- Use secure HTTP headers (`httpOnly`, `secure`, `sameSite`) for cookies in production.
- Handle cases where the captain referenced in the token does not exist in the database.

---

### **Example Request**:

#### **Using Cookies**:
```bash
curl -X GET http://localhost:5000/captain/profile \
  --cookie "token=<your-jwt-token>"
```

#### **Using Authorization Header**:
```bash
curl -X GET http://localhost:5000/captain/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### **Security**:
- Tokens should be short-lived and refreshed as necessary.
- Use HTTPS to protect tokens in transit.
- Implement proper logging and monitoring to detect unauthorized access attempts.


## Endpoint Documentation: **`/captain/logout`**

#### **Description**:
This endpoint logs out an authenticated captain by blacklisting their JWT token. Once logged out, the token is no longer valid for future requests.

---

### **HTTP Method**:
`GET`

---

### **URL**:
`/captain/logout`

---

### **Authentication**:
This endpoint requires a valid JWT token. The token can be passed in one of the following ways:
1. **Cookie**: A cookie named `token`.
2. **Authorization Header**: A bearer token in the `Authorization` header (`Bearer <token>`).

---

### **Request Headers**:
| Header Name          | Type   | Description                                         |
|----------------------|--------|-----------------------------------------------------|
| `Authorization`      | String | `Bearer <JWT Token>` (optional if token is in a cookie). |
| `Content-Type`       | String | Must be `application/json`.                        |

---

### **Request Parameters**:
None

---

### **Response**:

#### **Success (200)**:
If the request is authenticated and the logout process is successful, the server responds with a success message.

##### **Example**:
```json
{
    "message": "Successfully logged out",
    "success": true
}
```

---

#### **Error Responses**:

1. **Unauthorized (401)**:
   - **Reason**: Token is missing, invalid, or blacklisted.
   - **Example**:
     ```json
     {
         "message": "Unauthorized"
     }
     ```

2. **Server Error (500)**:
   - **Reason**: An unexpected error occurred while processing the request.
   - **Example**:
     ```json
     {
         "message": "Internal server Error"
     }
     ```

---

### **Middleware**:
- **`authCaptain`**:
  - Extracts the token from the cookie or authorization header.
  - Validates the token and checks if it has been blacklisted.
  - Verifies the token's authenticity and retrieves the captain's profile from the database.
  - Attaches the captain's data to `req.captain`.

---

### **Process**:
1. The endpoint authenticates the captain via the provided JWT token.
2. The token is added to the `BlacklistToken` collection, preventing its future use.
3. A success message is returned to indicate the logout was successful.

---

### **Validation**:
- Token must be a valid JWT signed with the secret defined in `process.env.JWT_SECRET`.
- Blacklisted tokens are rejected to prevent unauthorized access.

---

### **Example Request**:

#### **Using Cookies**:
```bash
curl -X GET http://localhost:5000/captain/logout \
  --cookie "token=<your-jwt-token>"
```

#### **Using Authorization Header**:
```bash
curl -X GET http://localhost:5000/captain/logout \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

### **Developer Notes**:
- Ensure the `BlacklistToken` model is implemented and properly indexed for efficient lookups.
- Use secure cookies (`httpOnly`, `secure`, `sameSite`) to handle tokens in production environments.
- Consider implementing token expiration checks to automatically invalidate old tokens.

---

### **Security**:
- Use HTTPS to secure token transmission.
- Regularly clean up the `BlacklistToken` collection to remove expired tokens.
- Implement proper logging to monitor logout activities.