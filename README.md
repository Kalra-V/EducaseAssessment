# School Management API

A Node.js API for managing school data, including adding new schools and retrieving a list of schools sorted by proximity to a user-specified location. This project uses Express.js and MySQL.

## Description

The School Management API allows users to perform the following actions:
- **Add a School:** Add a new school with its name, address, latitude, and longitude to the database.
- **List Schools:** Retrieve a list of schools sorted by proximity to the user’s location, based on latitude and longitude.

## Features

- Node.js with Express.js framework
- MySQL database for storing school data
- Environment variables for configuration management
- Postman collection for easy API testing

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/school-management-api.git
    cd school-management-api
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up MySQL Database:**

    - Create a MySQL database and a table as described in the "Database Setup" section below.
    - Populate the table with initial data.
## Database Setup

1. Open your MySQL command-line client or MySQL Workbench.
2. Log in to your MySQL server using your root credentials or any other user with sufficient privileges.
3. Create a new database by running the following command:

    ```sql
    CREATE DATABASE school_management;
    ```

**Create the `schools` Table**

Switch to the newly created database and create the `schools` table with the following structure:

```sql
USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

4. **Environment Variables:**

    - Create a `.env` file in the root directory and add the following variables:

    ```bash
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASS=your-db-password
    DB_NAME=school_management
    PORT=5000
    ```

5. **Start the Server:**

    ```bash
    npm start
    ```

## Environment Variables

The project requires the following environment variables:

- `DB_HOST`: The hostname or IP address of your MySQL server.
- `DB_USER`: The MySQL user.
- `DB_PASS`: The MySQL user's password.
- `DB_NAME`: The name of your MySQL database.
- `PORT`: The port number on which the server will run (default is 3000).

## API Endpoints

### Add School

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**

    ```json
    {
      "name": "Springfield High School",
      "address": "742 Evergreen Terrace",
      "latitude": 40.7128,
      "longitude": -74.0060
    }
    ```

- **Description:** Adds a new school to the database.

### List Schools

- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
    - `latitude`: User's current latitude.
    - `longitude`: User's current longitude.

- **Description:** Retrieves a list of schools sorted by proximity to the user's location.

## Usage

### Running the Server Locally

To start the server locally, use:

```bash
npm start
```
The API will be available at http://localhost:5000.

### Testing with Postman
 - Use the shared link for collections to test the API with postman locally on your system AFTER running the server.
