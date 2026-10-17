require('./db');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./auth');
const boardRoutes = require('./boards');
const PORT = 5000;
const authenticateToken = require('./middleware');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.get('/api/test-protected', authenticateToken, (req, res) => {
    res.json({
        message: 'You accessed a protected route!',
        user: req.user
    });
});
app.get('/', (req, res) => {
    res.send('TaskBoard backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
