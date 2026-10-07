# Kind Paws

Kind Paws is a pet-owner wellness platform for finding certified dog behaviourists and trainers, viewing trainer profiles, and booking consultation sessions.

This repository contains a React single-page application and an Express/Mongoose backend. The frontend communicates with the backend through REST API requests over HTTP.

## Project overview

### Frontend

- React 19
- React Router DOM 6
- Create React App
- Tailwind CSS
- Lucide React
- Testing Library and Jest

### Backend

- Node.js
- Express 5
- Mongoose 9
- MongoDB Atlas or a local MongoDB instance
- bcryptjs password hashing
- CORS enabled for the frontend

### Main product features

- Pet-owner signup and login
- Secure password hashing with bcrypt
- Session persistence through browser local storage
- Trainer directory with certification, experience, specialty, rating, and location information
- Trainer profile pages with consultation booking
- Consultation booking persistence in MongoDB
- Services, about, contact, FAQ, and testimonials pages
- Responsive navigation and mobile-friendly layouts
- Protected route handling for authenticated users

## Project structure

```text
Kind Paws/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    └── paws/
        ├── public/
        ├── src/
        │   ├── components/
        │   ├── data/
        │   ├── pages/
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.js
        │   └── index.css
        ├── package.json
        └── README.md
```

## Prerequisites

Before starting the project, install:

- Node.js 18 or newer
- npm
- MongoDB Atlas account, or a local MongoDB server
- A modern browser such as Chrome, Edge, Firefox, or Safari

Node.js 24 is used in the current project environment, but the application is compatible with supported Node.js 18+ releases.

## Environment configuration

The backend reads configuration from `backend/.env`.

Create or update the environment file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?appName=<app-name>
```

For a local MongoDB installation, use:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/kindpaws
```

The frontend currently calls the backend at:

```text
http://localhost:5000
```

This value is hard-coded in the login and booking components. If the backend is hosted elsewhere, update the API URLs in those components before deploying the frontend.

> Important: Do not commit real database credentials or passwords. The `.env` file must remain local and should be ignored by Git. The current environment file contains a MongoDB connection string and should be rotated if it has ever been shared or committed.

## Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend/paws
npm install
```

## Start the backend

From the repository root:

```bash
cd backend
node server.js
```

The backend starts on:

```text
http://localhost:5000
```

A successful startup should display logs similar to:

```text
✅ MongoDB connected
🚀 Kind Paws server running on port 5000
```

The backend also exposes a health check endpoint:

```bash
curl http://localhost:5000/api/health
```

Example response:

```json
{
  "status": "OK",
  "message": "Kind Paws server is running",
  "mongodb": "Connected"
}
```

## Start the frontend

Open a second terminal and run:

```bash
cd frontend/paws
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

Open this address in your browser to use the application.

## Application flow

1. Open `http://localhost:3000`.
2. Select **Create your account** or sign in with an existing account.
3. Sign in to access the trainer directory and booking pages.
4. Search or review available trainers.
5. Open a trainer profile.
6. Select **Book a Consultation**.
7. Enter the dog's details, date, time, and notes.
8. Submit the booking to the backend.
9. The booking is saved to MongoDB with a Pending status.

## Frontend routes

| Route | Purpose | Authentication |
| --- | --- | --- |
| `/` | Home page | Required |
| `/trainers` | Trainer directory | Required |
| `/trainer/:id` | Trainer profile and booking form | Required |
| `/booking` | Booking page | Required |
| `/services` | Services page | Required |
| `/about` | About page | Required |
| `/contact` | Contact page | Required |
| `/login` | Sign in or create an account | Public |

The application redirects unauthenticated users from protected routes to `/login`.

When a user is already authenticated, navigating to `/login` redirects them to `/`.

Any unknown route is redirected to `/`, which supports SPA route refresh behavior.

## Backend API

The backend uses the following endpoints.

### Create a booking

```http
POST /api/bookings
Content-Type: application/json
```

Request body:

```json
{
  "trainerId": 1,
  "trainerName": "Dr. Arvind Kumar",
  "petOwnerId": "owner-object-id",
  "petOwnerName": "Aarav Sharma",
  "petOwnerEmail": "aarav@example.com",
  "dogName": "Buddy",
  "date": "2026-10-10",
  "time": "16:30",
  "notes": "Needs help with leash reactivity.",
  "service": "Aggression"
}
```

Required fields are the trainer ID and name, owner name and email, dog name, date, and time.

Response status:

- `201 Created` when the booking is saved.
- `400 Bad Request` when required data is missing.
- `500 Internal Server Error` when a database or server error occurs.

### Sign up

```http
POST /api/signup
Content-Type: application/json
```

Request body:

```json
{
  "fullName": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "strong-password",
  "phone": "+91 98765 43210",
  "petName": "Buddy",
  "preferredService": "behavior-support",
  "userType": "pet-owner"
}
```

The password is hashed before it is stored in MongoDB. The backend returns a sanitized user object containing the user ID, name, and email.

### Log in

```http
POST /api/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "aarav@example.com",
  "password": "strong-password"
}
```

A successful response includes the authenticated user's ID, name, and email.

### Health check

```http
GET /api/health
```

This endpoint reports whether the server is running and whether MongoDB is connected.

## Database models

### User

The User collection stores pet-owner accounts.

- `fullName`: required
- `email`: required, unique, lowercased
- `password`: required, hashed before saving
- `phone`: optional
- `petName`: optional
- `preferredService`: optional
- `userType`: defaults to `pet-owner`
- `role`: defaults to `pet-owner`
- `createdAt`: creation timestamp

### Booking

The Booking collection stores consultation requests.

- `trainerId`: numeric trainer identifier
- `trainerName`: trainer name
- `petOwnerId`: optional owner MongoDB ID
- `petOwnerName`: owner name
- `petOwnerEmail`: owner email
- `dogName`: dog name
- `date`: appointment date
- `time`: appointment time
- `notes`: optional notes
- `service`: selected service
- `status`: Pending, Confirmed, Completed, or Cancelled
- `createdAt`: creation timestamp

## Authentication and session handling

The frontend stores authenticated user data in browser local storage under the key:

```text
kindPawsUser
```

The browser value is restored when the frontend loads. The frontend also sends the user ID and owner details when creating a booking.

For production deployment, a secure session strategy such as HTTP-only cookies and server-side session storage is recommended instead of relying only on local storage.

## Frontend development

### Run tests

```bash
cd frontend/paws
CI=true npm test -- --runInBand
```

The current suite verifies:

- Login page rendering
- Navbar navigation to services
- Trainer booking form behavior
- Hero CTA navigation
- SPA fallback after a direct route refresh

### Create a production build

```bash
cd frontend/paws
npm run build
```

The optimized build is generated in:

```text
frontend/paws/build/
```

### Run the development server

```bash
cd frontend/paws
npm start
```

The development server watches source changes and reloads the browser automatically.

## Testing the complete application

1. Start MongoDB or provide a working `MONGODB_URI`.
2. Start the backend with `node server.js`.
3. Confirm `http://localhost:5000/api/health` returns `status: OK`.
4. Start the frontend with `npm start`.
5. Open `http://localhost:3000`.
6. Create an account, sign in, and navigate to the trainer directory.
7. Open a trainer profile and submit a consultation booking.
8. Confirm the browser receives a success message and the backend returns `201 Created`.

## Troubleshooting

### MongoDB connection failure

Check the value of `MONGODB_URI` in `backend/.env`. Confirm that the cluster credentials, database name, and network access are valid.

### Frontend cannot reach the backend

The frontend uses `http://localhost:5000`. Make sure the backend is running and that the browser can reach port 5000.

### Login fails

- Confirm the user was created through the signup endpoint.
- Confirm the password entered matches the original password.
- Confirm that MongoDB is connected.

### Booking fails

The booking form requires a trainer ID, trainer name, owner name, owner email, dog name, date, and time. Check the browser console and the backend terminal for the complete error message.

### Frontend route reloads to an empty page

The app includes a fallback route to `/`. For production hosting, the web server must serve the frontend's `index.html` for unknown paths when using client-side routing.

### Port already in use

Change the backend port in `.env`, or stop the previous process using the process ID associated with port 5000.

## Production deployment notes

- Serve the frontend from a static hosting service or CDN.
- Deploy the Express server to a Node.js hosting platform.
- Configure the production `MONGODB_URI` securely.
- Use HTTPS for both frontend and API traffic.
- Replace local-storage authentication with secure HTTP-only cookies for production.
- Add a production proxy or API base URL so the frontend does not need a hard-coded local development address.
- Rotate any MongoDB credentials that may have been exposed.

## License

This project is currently unlicensed.
