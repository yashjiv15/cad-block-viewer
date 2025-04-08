// src/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CAD Block Viewer API',
      version: '1.0.0',
      description: 'API documentation for the CAD Block Viewer backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local dev server on port 5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Routes with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
