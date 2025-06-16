module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Asset Management API',
    version: '1.0.0',
    description: 'API for managing employees, assets, and repair requests'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  paths: {
    '/employees': {
      get: {
        summary: 'Get all employees',
        responses: {
          200: {
            description: 'List of employees'
          }
        }
      }
    },
    '/employees/{id}': {
      get: {
        summary: 'Get employee by ID',
        parameters: [{
          name: 'id',
          in: 'path',
          required: true
        }],
        responses: {
          200: { description: 'Employee object' },
          404: { description: 'Not found' }
        }
      }
    },
    '/employees/{id}/assets': {
      get: {
        summary: 'Get assets assigned to employee',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Assets list' } }
      }
    },
    '/employees/{id}/repairs': {
      get: {
        summary: 'Get repair requests by employee',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Repairs list' } }
      }
    },
    '/assets': {
      get: {
        summary: 'Get all assets',
        responses: { 200: { description: 'Asset list' } }
      },
      post: {
        summary: 'Create asset',
        responses: { 201: { description: 'Asset created' } }
      }
    },
    '/assets/{id}': {
      put: {
        summary: 'Update asset',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
      }
    },
    '/repairs': {
      get: { summary: 'List repairs', responses: { 200: { description: 'List' } } },
      post: { summary: 'Create repair', responses: { 201: { description: 'Created' } } }
    },
    '/repairs/{id}': {
      put: {
        summary: 'Update repair',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
      }
    }
  }
};