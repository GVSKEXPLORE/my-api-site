// swagger.js
module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Employee Asset Management API",
    version: "1.0.0",
    description: "API to manage employees, assets, and repair requests."
  },
  servers: [
    {
      url: "https://my-api-site.onrender.com",
      description: "Production Server"
    }
  ],
  paths: {
    "/employees": {
      get: {
        summary: "Get all employees",
        responses: {
          "200": { description: "OK" }
        }
      },
      post: {
        summary: "Create a new employee",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" }
            }
          }
        },
        responses: {
          "201": { description: "Created" }
        }
      }
    },
    "/employees/{id}": {
      get: {
        summary: "Get employee by ID",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          "200": { description: "OK" },
          "404": { description: "Not Found" }
        }
      },
      put: {
        summary: "Update employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { type: "object" } }
          }
        },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        summary: "Delete employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    },
    "/employees/{id}/assets": {
      get: {
        summary: "Get assets assigned to an employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "200": { description: "OK" } }
      }
    },
    "/employees/{id}/repairs": {
      get: {
        summary: "Get repairs requested by an employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "200": { description: "OK" } }
      }
    },
    "/assets": {
      get: { summary: "Get all assets", responses: { "200": { description: "OK" } } },
      post: {
        summary: "Create asset",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "201": { description: "Created" } }
      }
    },
    "/assets/{id}": {
      put: {
        summary: "Update asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        summary: "Delete asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    },
    "/assets/{id}/assign": {
      post: {
        summary: "Assign asset to employee",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "200": { description: "Assigned" }, "404": { description: "Not Found" } }
      }
    },
    "/assets/{id}/unassign": {
      post: {
        summary: "Unassign asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "200": { description: "Unassigned" }, "404": { description: "Not Found" } }
      }
    },
    "/repairs": {
      get: { summary: "Get all repair requests", responses: { "200": { description: "OK" } } },
      post: {
        summary: "Create a repair request",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "201": { description: "Created" } }
      }
    },
    "/repairs/{id}": {
      get: {
        summary: "Get repair by ID",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "200": { description: "OK" }, "404": { description: "Not Found" } }
      },
      put: {
        summary: "Update repair",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        summary: "Delete repair",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    }
  }
};
