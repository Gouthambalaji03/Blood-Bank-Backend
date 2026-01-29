# Blood Bank Backend

Node.js/Express backend API for the Blood Bank Management System.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=8080
   DEV_MODE=development
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   # Development (with nodemon)
   npm run server

   # Production
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/auth/current-user` | Get current user |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/inventory/create-inventory` | Add blood inventory |
| GET | `/api/v1/inventory/get-inventory` | Get all inventory |
| GET | `/api/v1/inventory/get-donars` | Get all donors |
| GET | `/api/v1/inventory/get-hospitals` | Get all hospitals |
| GET | `/api/v1/inventory/get-organisation` | Get organisations (for donors) |
| GET | `/api/v1/inventory/get-all-organisations` | Get all organisations |
| POST | `/api/v1/inventory/donor-create-donation` | Donor submits donation |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/bloodGroups-data` | Get blood group statistics |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/admin/donar-list` | Get all donors (admin) |
| GET | `/api/v1/admin/hospital-list` | Get all hospitals (admin) |
| GET | `/api/v1/admin/org-list` | Get all organisations (admin) |
| DELETE | `/api/v1/admin/delete-donar/:id` | Delete donor |
| DELETE | `/api/v1/admin/delete-hospital/:id` | Delete hospital |
| DELETE | `/api/v1/admin/delete-org/:id` | Delete organisation |

## Sample Test Credentials

Use these credentials to test the application:

### Admin
```
Email: admin@bloodbank.com
Password: password123
Role: admin
```

### Organisation (Blood Bank)
```
Email: org@bloodbank.com
Password: password123
Role: organisation
Organisation Name: Red Cross Blood Bank
```

### Donors
```
Email: john@example.com
Password: password123
Role: donar
Name: John Doe

Email: jane@example.com
Password: password123
Role: donar
Name: Jane Smith

Email: mike@example.com
Password: password123
Role: donar
Name: Mike Johnson
```

### Hospitals
```
Email: cityhospital@example.com
Password: password123
Role: hospital
Hospital Name: City General Hospital

Email: memorial@example.com
Password: password123
Role: hospital
Hospital Name: Memorial Hospital
```

## Seed Database

To populate the database with sample data:
```bash
npm run seed
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8080) |
| `DEV_MODE` | development or production |
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |

## Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `DEV_MODE=production`
4. Deploy
