# MyBlog API

A robust RESTful API for a blogging platform built with **Node.js**, **Express**, and **MongoDB**. This project features production-grade logging, authentication, and API documentation.

## 🚀 Features

- **User Management**: Create, read, update, and delete users.
- **Article Management**: Full CRUD operations for blog articles.
- **Comments System**: Manage comments on specific articles.
- **Authentication**: Secure JWT-based authentication.
- **Advanced Logging**: 
  - **Winston** for structured logging.
  - **Daily Log Rotation** to manage file sizes.
  - **Logtail (Better Stack)** integration for cloud monitoring.
  - **Correlation IDs** to trace requests across the system.
- **API Documentation**: Integrated Swagger UI.
- **Input Validation**: Automated request validation using `express-openapi-validator`.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Logging**: Winston, Logtail, Morgan
- **Documentation**: Swagger UI Express, YAML

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
DB_CONNECTION_STRING=mongodb://localhost:27017/myblog_db

# Security
ACCESS_TOKEN_SECRET=your_jwt_secret

# Logging (Better Stack / Logtail)
SOURCE_TOKEN=your_logtail_source_token
INGESTING_HOST=in.logs.betterstack.com
```

## 📦 Installation & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start in Development Mode** (uses Nodemon)
   ```bash
   npm run dev
   ```

3. **Start in Production**
   ```bash
   npm start
   ```

## 📖 API Documentation

Once the server is running, you can explore the endpoints via Swagger UI:

👉 **http://localhost:4000/docs** (Default URL)

## 📝 Logging System

The application uses a custom logging architecture located in `src/utils/logger`.

1.  **Transports**: Logs are sent to the **Console**, **File System** (rotated daily), and **Logtail** (cloud).
2.  **Correlation ID**: Every request is assigned a unique `x-correlation-id` (or generates one). This ID is attached to every log message, allowing you to trace a specific user's journey through the logs.
3.  **Log Levels**:
    - `http`: Incoming HTTP requests.
    - `info`: General application events.
    - `error`: Application errors and exceptions.

## 📂 Project Structure

- `src/api/v1`: Controllers and logic for specific resources (User, Article).
- `src/middleware`: Custom Express middlewares (Logger, Correlation ID).
- `src/utils`: Helper functions and the Logger configuration.