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

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/contact?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB Successfully!');
        
        // Set the port from the environment variable or default to 3000
        const port = process.env.PORT || 3000;

        // Start the server after successfully connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
