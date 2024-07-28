# Bento Clone

A sophisticated clone of the Bento application, showcasing modern web development practices with a robust frontend and backend architecture.

## Features

- **User Authentication:** Secure sign-up and login functionality.
- **Responsive UI:** Adaptive design built with TailwindCSS.
- **Dynamic Data:** API integration for real-time data updates.
- **Deployment:** Seamlessly deployed on Vercel.

## Technologies Used

### Frontend
- NextJS
- TailwindCSS
- Axios
- Redux

### Backend
- Node.js
- Express
- MongoDB

### Deployment
- Vercel (Frontend)
- Render (Backend)

## Live Demo

Experience the application live [here](https://bento-clone-app.vercel.app).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

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

4. **Run the application**
    - **Backend**
        ```sh
        cd backend
        npm start
        ```
    - **Frontend**
        ```sh
        cd frontend
        npm run dev
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
