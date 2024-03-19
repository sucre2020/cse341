const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.Config'); // Import Swagger configuration
require('dotenv/config');

const app = express();

// Create middlewares
app.use(bodyParser.json());

// Import routes
const postsRoutes = require('./myRoute/projects');

// app.use('/', require('./routes/projects'))

// Use the posts routes
app.use('/projects', postsRoutes);

app.use('/', require('../routes/index'))

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB Successfully!');
        
        // Set the port from the environment variable or default to 4000
        const port = process.env.PORT || 4000;

        // Start the server after successfully connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
