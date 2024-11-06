const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const incomeExpenseRoutes = require('./routes/incomeExpense');
const auth = require('./routes/auth'); // Ensure it's using CommonJS syntax

const app = express();
const PORT = process.env.PORT || 5001;
const chatbotRoutes = require('./routes/chatbotRoutes');  // Our custom routes for chatbot

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // This tells Express to serve files from the 'public' directory

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the root route
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the index.html file
});

// Serve home.html
app.get('/home.html', (_req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Serve your home.html file
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/budgeting.html');
});

// Use the auth routes
app.use('/api', auth); // Ensure your auth routes are correctly set up
app.use(express.json()); // Parse JSON bodies
app.use('/api/incomeexpense', incomeExpenseRoutes);
app.use('/api/chatbot', chatbotRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
