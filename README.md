# Theme Preference Application

An application which demonstrates the abilities to change theme for web UI and persist those changes.
This application uses Express.js for the backend API and React.js for the frontend.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [API Endpoints](#api-endpoints)


## Installation
```bash
# Clone the repository
git clone [<repository_url>](https://github.com/jainudit012/theme-preference-app)

# Navigate to the project directory
cd theme-preference-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Usage

You will require a `.env` file for backend which is not included in the repo.

Sample of `backend/.env`
```bash
PORT = 3001
DEFAULT_THEME = 'light'
JWT_SECRET = 'your-secret-key'
PASSWORD_SALT = 'password_salt_value'
```

```bash
# Run the backend server
cd backend
npm start

# Run the frontend server
cd ../frontend
npm start
```

## Backend Setup

You will require the `.env` as well as the dependencies required to be installed.

## Frontend Setup

Just install the dependencies and you are good to go.

## API Endpoints
1. /api/login (POST) : Logs the user and generates the auth token (jwt). Request Body: username: {string}, password: {string}, theme: {string}
2. /api/signup (POST) : Creates the user and generates the auth token (jwt). Request Body: username: {string}, password: {string}, theme: {string}
3. /api/logout (POST) : Logs out the current user. Request Body: {Empty}
4. /api/user/theme-choice (GET) : Fetches all the theme choices supported by the application
5. /api/user/preferences (GET) : Fetches current theme preference of the User. JWT required in `Authorization` header with `Bearer <token>` format.
6. /api/user/preferences (POST) : Updates the user's theme to the provided theme. JWT required in `Authorization` header with `Bearer <token>` format. Request Body: theme: {string}
