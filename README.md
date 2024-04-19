# Blog API with Node.js, Express.js, and MongoDB

This project is a RESTful API for managing a blog, built using Node.js, Express.js, and MongoDB. It follows the principles of clean architecture and utilizes the repository pattern for data access.

## Key Features

- **CRUD Operations**: Allows users to create, read, update, and delete blog posts.
- **User Authentication**: Secure endpoints with user authentication and authorization.
- **Data Validation**: Ensure data integrity with input validation using DTOs (Data Transfer Objects).
- **Error Handling**: Proper handling of errors with meaningful error messages for improved debugging.
- **Middleware**: Utilize middleware for asynchronous error handling and authentication checks.
- **Clean Architecture**: Structured project organization following clean architecture principles for maintainability and scalability.
- **Repository Pattern**: Encapsulate data access logic with repository interfaces and implementations.
- **MongoDB Integration**: Interact with MongoDB database using Mongoose for schema modeling and data manipulation.
- **JWT Authentication**: Generate and validate JSON Web Tokens (JWT) for user authentication and authorization.
- **Configurable**: Easily configure database connection and Express.js settings with provided configuration files.
- **Reusable Components**: Use of DTOs, middleware, and repository interfaces for code reusability and modularity.

## Installation

To get started with the blog API, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/blog-api.git

2. **Install dependencies:**

   ```bash
   cd blog-api
   npm install

3. **Configure environment variables:**

   Create a `.env` file in the root directory and provide the necessary environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your_secret_key

4. **Start the application:**

   ```bash
   npm start



