const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import Swagger configuration
require('dotenv/config');

const app = express();

// Create middlewares
app.use(bodyParser.json());

// Import routes
const postsRoutes = require('./routes/projects');

app.use('/', require('./routes/index'))

// Use the projects routes
app.use('/projects', postsRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/projects?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {})
    .then(() => {
        console.log('Connected to MongoDB Successfully!');
        
        // Set the port from the environment variable or default to 3000
        const port = process.env.PORT || 4000;

        // Start the server after successfully connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
