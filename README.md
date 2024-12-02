````markdown
# **SIH-MuseUBot**

MuseUBot is an AI-powered virtual guide designed for museums, enhancing visitor engagement with real-time interactions and personalized insights. It provides detailed descriptions, historical context, and multimedia resources like images and videos. Accessible via text or voice, it transforms museum experiences, both in-person and virtually.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Backend Setup (Flask)](#backend-setup-flask)
7. [Frontend Setup (React)](#frontend-setup-react)
8. [Database Setup (MySQL)](#database-setup-mysql)
9. [Running the Project](#running-the-project)
10. [Troubleshooting](#troubleshooting)

---

## **Project Overview**

MuseUBot provides an interactive and personalized experience to museum visitors using AI and real-time data. Whether it's a physical or virtual museum tour, visitors can ask questions, explore museum content, and receive detailed responses, images, and videos.

---

## **Technologies Used**

-   **Frontend**: React.js
-   **Backend**: Flask (Python)
-   **Database**: MySQL
-   **APIs**: Flask-CORS for cross-origin requests, AI libraries for chatbot functionality
-   **Hosting**: Local or cloud-based servers
-   **Version Control**: Git/GitHub

---

## **Features**

-   Real-time interaction with a virtual AI-powered museum guide.
-   Access to museum content, images, and videos.
-   Personalized recommendations for exhibits.
-   Can be accessed through text or voice commands.
-   Works in physical and virtual environments.

---

## **Prerequisites**

Ensure that you have the following installed on your machine:

1. **Git** - For version control.
2. **Python 3.8+** - To run Flask backend.
3. **Node.js & npm** - For running the React frontend.
4. **MySQL** - For the backend database.
5. **Flask and its dependencies** - Installed via `pip`.
6. **React libraries** - Installed via `npm`.

---

## **Installation**

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Shivanshu-23/SIH-MuseUBot.git
    cd SIH-MuseUBot
    ```
````

---

## **Backend Setup (Flask)**

1.  Manually install dependencies:

```bash
pip install flask mysql-connector-python flask-cors
```

2. **Create the MySQL Database**

    Create a MySQL database named `MuseumBooking`. You can use the following SQL command:

    ```sql
    CREATE DATABASE MuseumBooking;
    ```

    Import tables:

    ```bash
    mysql -u root -p MuseumBooking < database/museum_booking.sql
    ```

3. **Run Flask Backend**

    ```bash
    export FLASK_APP=app.py  # On Windows: set FLASK_APP=app.py
    export FLASK_ENV=development  # Enables debug mode, use set for Windows
    flask run
    ```

    The backend will be running at `http://127.0.0.1:5000`.

---

## **Frontend Setup (React)**

1. **Install Node.js Dependencies**

    Inside the `SIH-MuseUBot/Client` directory, install the necessary npm packages:

    ```bash
    cd Client
    npm install
    ```

2. **Run React Frontend**

    After installing dependencies, run the following to start the React frontend:

    ```bash
    npm start
    ```

    The frontend will be running at `http://localhost:3000`.

---

## **Database Setup (MySQL)**

1. **Configure Database Credentials**

    Ensure the correct MySQL credentials are set in the `Backend/app.py` file for the Flask API:

    ```python
    db_config = {
        'host': 'localhost',
        'user': 'root',
        'password': 'admin123',  # Replace with your actual MySQL password
        'database': 'MuseumBooking',
        'port': 3306,
    }
    ```

2. **Check Database Connection**

    Run the Flask backend and make sure it connects to the MySQL database without issues. You should see "Connected to the MySQL database" if it's successful.

---

## **Running the Project**

1. **Start Backend (Flask)**

    ```bash
    cd Backend
    flask run
    ```

2. **Start Frontend (React)**

    In a separate terminal, start the frontend:

    ```bash
    cd Client
    npm start
    ```

3. **Open the Application**

    - Access the frontend at `http://localhost:3000`.
    - The backend API runs at `http://127.0.0.1:5000`.

--

## **Troubleshooting**

1. **ModuleNotFoundError for Flask-CORS**

    If you encounter `ModuleNotFoundError: No module named 'flask_cors'`, install Flask-CORS via pip:

    ```bash
    pip install flask-cors
    ```

2. **Database Connection Issues**

    Double-check your MySQL credentials and ensure that MySQL is running. You can start MySQL using:

    ```bash
    sudo service mysql start  # On Linux/Mac
    ```

3. **Port Conflicts**

    If `localhost:5000` or `localhost:3000` is already in use, specify a different port when running Flask or React.

---

## **Contributing**

Contributions are welcome! Please submit a pull request for any improvements or bug fixes.

---

---

```

```
