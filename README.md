# Blood Bank Backend

## Overview
A backend service for managing blood bank operations, including inventory tracking, donor management, and request fulfillment.

## Features
- Donor registration and management
- Blood inventory tracking
- Blood request processing
- Compatibility checking
- User authentication and authorization

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Database (MongoDB/PostgreSQL)

## Installation
```bash
git clone <repository-url>
cd Blood-Bank-Backend
npm install
```

## Configuration
Create a `.env` file in the root directory:
```
DATABASE_URL=<your-database-url>
PORT=5000
JWT_SECRET=<your-secret-key>
```

## Running the Project
```bash
npm start
```

## API Endpoints
- `POST /api/donors` - Register a donor
- `GET /api/donors` - List all donors
- `POST /api/blood-requests` - Create a request
- `GET /api/inventory` - Check blood inventory

## Technologies
- Node.js
- Express.js
- Database: [Add your choice]

## Contributing
Pull requests are welcome. Please follow the project's coding standards.

## License
[Add your license type]