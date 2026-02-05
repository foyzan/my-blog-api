# MyBlog API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-yellow?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

## 📝 Description

A RESTful blog API built with Express.js and MongoDB that enables users to create, view, and manage articles with full administrative control. The API supports user authentication, article management, and community interactions through comments.

## ✨ Key Features

- **Article Management**: Create, read, update, and delete articles
- **User Authentication**: Secure user registration and login
- **Comment System**: Users can comment on articles
- **Admin Control**: Full administrative capabilities for content management
- **Swagger Documentation**: Interactive API documentation
- **Docker Support**: Containerized deployment ready

## 🛠 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Swagger/OpenAPI
- **Development**: Nodemon for hot-reload
- **Deployment Ready**: Docker & Docker Compose support

## 📚 Documentation

- **[API Documentation](https://app.swaggerhub.com/apis/zencode-212/myblogAPI/1.0.0)** - Interactive Swagger UI
- **[Project Details](https://www.notion.so/Simple-blog-API-2bcfb7bf80088000a021c06bd56a9ea8)** - Notion documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myblog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   # Development mode (with hot-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at `http://localhost:3000` (or your configured port)

### Using Docker

```bash
docker-compose up
```

## 📁 Project Structure

```
src/
├── api/
│   ├── v1/                 # API v1 endpoints
│   │   ├── article/        # Article endpoints
│   │   ├── authentication/ # Auth endpoints
│   │   ├── comment/        # Comment endpoints
│   │   └── user/           # User endpoints
│   └── v2/                 # API v2 (extensible)
├── db/
│   └── connectDB.js        # MongoDB connection
├── model/
│   ├── Article.model.js    # Article schema
│   ├── Comment.model.js    # Comment schema
│   └── User.model.js       # User schema
├── middleware/
│   └── authentication.js   # Auth middleware
├── lib/                    # Utility libraries
├── utils/                  # Helper functions
├── app.js                  # Express app setup
└── index.js                # Server entry point
```

## 🔐 Environment Configuration

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/myblog
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myblog

# JWT Secret (for authentication)
JWT_SECRET=your_secret_key_here

# API Versioning
API_VERSION=v1
```

## 📡 API Endpoints Overview

### Articles
- `GET /api/v1/article` - List all articles
- `POST /api/v1/article` - Create new article
- `GET /api/v1/article/:id` - Get single article
- `PUT /api/v1/article/:id` - Update article
- `DELETE /api/v1/article/:id` - Delete article

### Users
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/:id` - Get user profile

### Comments
- `GET /api/v1/comment/article/:articleId` - Get article comments
- `POST /api/v1/comment` - Add comment
- `DELETE /api/v1/comment/:id` - Delete comment

For complete endpoint documentation, refer to the [Swagger API Docs](https://app.swaggerhub.com/apis/zencode-212/myblogAPI/1.0.0)

## 🔄 Development Workflow

```bash
# Watch for file changes and auto-restart
npm run dev

# Run in production mode
npm start

# Build/seed database (if applicable)
node seed.js
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **swagger-ui-express**: Swagger documentation UI
- **express-openapi-validator**: OpenAPI validation
- **yamljs**: YAML parser
- **nodemon**: Development auto-reload (dev dependency)
- **@faker-js/faker**: Test data generation (dev dependency)

## 📋 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

## 👤 Author

**Zencode-212**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Last Updated**: February 2026  
**Status**: Active Development
