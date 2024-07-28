# Bento Clone

A sophisticated clone of the Bento application, showcasing modern web development practices with a robust frontend and backend architecture.

## Features

- **User Authentication**: Secure sign-up and login functionality using OAuth.
- **Responsive UI**: Adaptive design built with SCSS.
- **Dynamic Data**: API integration for real-time data updates.
- **Image Storage**: Utilizes Cloudinary for efficient and secure image storage.
- **Deployment**: Frontend seamlessly deployed on Vercel. Backend deployed on Render.

## Technologies Used

### Frontend

![NextJS](https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Live Demo

Experience the application live [https://bento-clone-app.vercel.app](https://bento-clone-app.vercel.app)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```sh
   git clone https://github.com/Balaganesh003/bento-clone.git
   ```

2. **Navigate to the project directory**

   ```sh
   cd bento-clone
   ```

3. **Install dependencies**
   - **Backend**
     ```sh
     cd backend
     npm install
     ```
   - **Frontend**
     ```sh
     cd frontend
     npm install
     ```

## Environment Variables

### Backend

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLIENT_URL`
- `MONGO_URL`
- `PORT`
- `PASSWORD`
- `JWT_SECRET`
- `SESSION_SECRET`
- `COOKIE_KEY_1`
- `COOKIE_KEY_2`
- `ORIGIN_1`
- `ORIGIN_2`
- `ORIGIN_3`
- `ORIGIN_4`
- `NODE_ENV`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_FROM`

### Frontend

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_API_URL`

## Setup

To run this project, create a `.env` file in the root directory for the backend and another `.env` file in the root directory for the frontend with the necessary environment variables listed above.

4. **Run the application**
   - **Backend**
     ```sh
     cd backend
     npm start
     ```
   - **Frontend**
     ```sh
     cd frontend
     npm start
     ```

## Usage

Once the application is up and running, open your browser and navigate to:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Project Structure

```plaintext
bento-clone/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
├── .prettierrc
└── README.md
```
