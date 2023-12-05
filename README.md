# Project Overview

## In the project, I have the following components:

1. **MongoDB Cloud:**

   - The database is hosted in MongoDB Cloud, where I store the data.

2. **Local Backend Server:**

   - I have a local backend server running on my machine, listening on port 8090.

3. **Express.js and Mongoose:**

   - Utilizing **Express.js**, a web application framework for Node.js, to handle HTTP requests.
   - **Mongoose**, an Object Data Modeling (ODM) library for MongoDB and Node.js, is used for structured data modeling. It provides a straight-forward, schema-based solution to model my application data.

4. **Endpoints:**

   - RESTful endpoints are defined in the Express.js application, facilitating interactions with the MongoDB database. Endpoints include operations such as fetching all students, getting a student by ID, and adding a new student.

5. **Sample Data Population:**

   - Initially, I'm populating the MongoDB database with sample student data.

6. **Interaction with MongoDB Cloud:**
   - When a request is received (e.g., to get all students), the backend server queries the MongoDB Cloud database using Mongoose to retrieve the necessary data. The data is then sent back as a response to the client.

## Summary

In essence, the local backend server acts as an intermediary between the frontend and the MongoDB Cloud database. It manages incoming requests and responses, serving as the bridge for data interactions.

## Project Setup

# Prerequisites

Before you begin, make sure you have the following installed:
Node.js
npm

# Initialize Node.js Project

Run the following command to initialize your Node.js project. You will be prompted to provide some information about your project.

- npm init

# Install Dependencies

Run the following command to install the project dependencies:

- npm install express mongoose dotenv

# Set Up Environment Variables

Create a .env file in the root of your project and add your MongoDB connection string:

MONGO_URI=<your-mongodb-connection-string>

# Run the Project

node server.js
server will start running at http://localhost:8090.

# Database Population

Once the server is running, it will connect to MongoDB and populate the database with sample student data provided

# REST Endpoints

GET /students: Retrieve all students.
GET /students/:id: Retrieve a student by ID.
POST /students: Add a new student.
