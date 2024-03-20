const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project API',
            version: '1.0.0',
            description: 'Documentation On How To Use This Project API',
        },
    },
    apis: ['./myRoute/projects.js'], // Path to API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;