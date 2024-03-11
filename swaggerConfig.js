// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'Documentation for Contact API',
        },
    },
    apis: ['./routes/*.js'], // Path to API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
