const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to get users
app.get('/users.json', (req, res) => {
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.json([]);
    }
});

// Route to save users
app.post('/users.json', (req, res) => {
    try {
        fs.writeFileSync('users.json', JSON.stringify(req.body, null, 4));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save users' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 