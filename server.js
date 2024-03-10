const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

// Create middlewares
app.use(bodyParser.json());

// Import routes
const postsRoutes = require('./routes/posts');

// Use the posts routes
app.use('/posts', postsRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/post', (req, res) => {
    res.send('We are on post');
});

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/contact?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB!');
        
        // Start the server after successfully connecting to MongoDB
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
