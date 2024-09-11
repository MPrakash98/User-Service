# Introduction
A sample NodeJS environment that performs register,login with JWT Token, Profile Updation,Pagination and filter with deletion on a MongoDB user collection.


## Features

- User Registration API.
- Login API with JWT.
- Profile Update API.
- Paginated List of Users.
- Delete User by ID.
- Search Users by Name or Email.


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MPrakash98/User-Service.git
   cd User-Service
   ```
    
2. **Install Dependencies**:
Make sure you have MongoDB installed and running at port 27017 with Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run start
   ```
    
## API Endpoints


#### User Registration API

```http
  POST /api/register
```

#### Login API with JWT

```http
  POST /api/login
```

#### Profile Update API

```http
  PUT /api/profile
```

#### Paginated List of Users

```http
  GET /api/users
```

#### Delete User by ID

```http
  DELETE /api/users/:id
```

#### Search Users by Name or Email

```http
  GET /api/search
```

## File Structure

- **app.js**: Starting/entry point of app.
- **controllers/userController.js**: Manging database exposure and calculations.
- **helper/responder.js**: Handling the responses.
- **middleware/authMiddleware.js**: Managing custom middlewares.
- **models/user.js**: Database schema for user.
- **routes/userRoutes.js**: Managing routes.
