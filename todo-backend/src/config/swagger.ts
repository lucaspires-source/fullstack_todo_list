import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'API for managing todo items'
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    }
  ],
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          title: {
            type: 'string'
          },
          completed: {
            type: 'boolean',
            default: false
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts']
};

export default require('swagger-jsdoc')(options);