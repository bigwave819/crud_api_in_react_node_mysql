const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config();

const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error inside the server" });
        }
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error inside the server" });
        }
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error inside the server" });
        }
        return res.json(data);
    });
});

// DELETE method to remove a student
app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error inside the server" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.json({ message: "Student deleted successfully" });
    });
});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
