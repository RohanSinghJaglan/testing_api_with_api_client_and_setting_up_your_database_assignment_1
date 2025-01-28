// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON requests
app.use(express.json());

// Static file serving for frontend (if needed)
app.use(express.static('static'));

// Mock data: 100 students with random marks
const students = Array.from({ length: 100 }, (_, i) => ({
    student_id: `${i + 1}`,
    name: `Student ${i + 1}`,
    marks: {
        math: Math.floor(Math.random() * 100),
        science: Math.floor(Math.random() * 100),
        english: Math.floor(Math.random() * 100),
        history: Math.floor(Math.random() * 100),
        geography: Math.floor(Math.random() * 100),
    },
    get total() {
        return Object.values(this.marks).reduce((sum, mark) => sum + mark, 0);
    }
}));

// API Endpoint: Retrieve Students Above Threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Validate threshold input
    if (typeof threshold !== 'number' || isNaN(threshold)) {
        return res.status(400).json({ error: 'Invalid threshold value. Please provide a valid number.' });
    }

    // Filter students whose total marks exceed the threshold
    const filteredStudents = students
        .filter(student => student.total > threshold)
        .map(({ name, total }) => ({ name, total }));

    // Respond with the filtered list and count
    res.json({
        count: filteredStudents.length,
        students: filteredStudents
    });
});

// Root Route: Serve a sample HTML page (optional)
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
