require('./db');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./auth');
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('TaskBoard backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
