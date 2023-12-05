// FILE: server.js
const express = require('express');
require('dotenv').config();// load environment variables from file named .env. The dotenv package is used for this.
const mongoose = require('mongoose'); //mongoose is a an Object Data Modeling (ODM) library for MongoDB and Node.js, is used for structured data modeling.

//establising Mongodb cloud database connection with backend server. used mongo DB server URI inside env variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected!'))
    .catch(err => console.error(err));

const app = express();
const port = 8090;

// MongoDB define schema for student
const studentSchema = new mongoose.Schema({
    studentid: Number,
    firstname: String,
    lastname: String,
    dateofbirth: String,
    grade: Number,
    gender: String,
});

//creating Student  model using studentSchema 
//here model name= student, Schema used  = studentSchema, collection name = StudentData
// Database name is mentioned inside  MongoDB connection string in side .env
const Student = mongoose.model('Student', studentSchema, 'StudentData');

// Populate with sample data
const sampleStudentData = [
    { studentid: 1, firstname: 'John', lastname: 'Doe', dateofbirth: '2000-01-01', grade: 5, gender: 'Male' },
    { studentid: 2, firstname: 'Jane', lastname: 'Smith', dateofbirth: '2001-02-02', grade: 7, gender: 'Female' },
    { studentid: 3, firstname: 'Alex', lastname: 'Johnson', dateofbirth: '1999-03-03', grade: 8, gender: 'Male' },
    { studentid: 4, firstname: 'Eva', lastname: 'Williams', dateofbirth: '2002-04-04', grade: 6, gender: 'Female' },
    { studentid: 5, firstname: 'Michael', lastname: 'Brown', dateofbirth: '2003-05-05', grade: 4, gender: 'Male' },
];

// Insert sample data into the database
//insertMany() Mongoose method is used to insert an array of documents (objects) 
//into the MongoDB collection associated with the Student model.
Student.insertMany(sampleStudentData)
    .then(() => console.log('Sample data inserted successfully'))
    .catch(err => console.error(err));



// ----------------REST Endpoints---------------------------------------

app.use(express.json());
const greetingMessage = { message: 'Hello World!' };

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(302).json(greetingMessage);
});


app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to retrieve student by ID
app.get('/students/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const student = await Student.findOne({ studentid: id });
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(student);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST methhod Endpoint to add a new student
app.post('/students', async (req, res) => {
    const { studentid, firstname, lastname, dateofbirth, grade, gender } = req.body;//extract prop

    if (!studentid || !firstname || !lastname || !dateofbirth || !grade || !gender) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    const newStudent = new Student({
        studentid,
        firstname,
        lastname,
        dateofbirth,
        grade,
        gender,
    });

    try {
        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------DELETE student endpoint------------
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedStudent = await Student.findOneAndDelete({ studentid: id });//'findOneAndUpdate' method from Mongoose searches for a document that matches the specified query ({ studentid: id })
        if (!deletedStudent) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT method to update a student by ID
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, dateofbirth, grade, gender } = req.body;

    if (!firstname || !lastname || !dateofbirth || !grade || !gender) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { studentid: id },
            { firstname, lastname, dateofbirth, grade, gender },// argument { firstname, lastname, dateofbirth, grade, gender } contains the updated fields and their new values.
            { new: true } //new: true option ensures that the method returns the modified document rather than the original one.

        );

        if (!updatedStudent) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ message: 'Student updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Start the Express server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Close the MongoDB connection when the server is closed
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
