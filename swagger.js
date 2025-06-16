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
  tags: [
    { name: "Employees" },
    { name: "Assets" },
    { name: "Repairs" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      Employee: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          department: { type: "string" }
        },
        required: ["name", "role", "department"]
      },
      Asset: {
        type: "object",
        properties: {
          type: { type: "string" },
          brand: { type: "string" },
          serialNumber: { type: "string" }
        },
        required: ["type", "brand", "serialNumber"]
      },
      Repair: {
        type: "object",
        properties: {
          employeeId: { type: "integer" },
          assetId: { type: "integer" },
          description: { type: "string" }
        },
        required: ["employeeId", "assetId", "description"]
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    "/employees": {
      get: {
        tags: ["Employees"],
        summary: "Get all employees",
        responses: {
          "200": { description: "OK" },
          "500": { description: "Internal Server Error" }
        }
      },
      post: {
        tags: ["Employees"],
        summary: "Create a new employee",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Employee" }
            }
          }
        },
        responses: {
          "201": { description: "Created" },
          "400": { description: "Bad Request" }
        }
      }
    },
    "/employees/{id}": {
      get: {
        tags: ["Employees"],
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
        tags: ["Employees"],
        summary: "Update employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Employee" }
            }
          }
        },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        tags: ["Employees"],
        summary: "Delete employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    },
    "/employees/{id}/assets": {
      get: {
        tags: ["Employees"],
        summary: "Get assets assigned to an employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "200": { description: "OK" } }
      }
    },
    "/employees/{id}/repairs": {
      get: {
        tags: ["Employees"],
        summary: "Get repairs requested by an employee",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { "200": { description: "OK" } }
      }
    },
    "/assets": {
      get: { tags: ["Assets"], summary: "Get all assets", responses: { "200": { description: "OK" } } },
      post: {
        tags: ["Assets"],
        summary: "Create asset",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Asset" } }
          }
        },
        responses: { "201": { description: "Created" } }
      }
    },
    "/assets/{id}": {
      put: {
        tags: ["Assets"],
        summary: "Update asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Asset" } }
          }
        },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        tags: ["Assets"],
        summary: "Delete asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    },
    "/assets/{id}/assign": {
      post: {
        tags: ["Assets"],
        summary: "Assign asset to employee",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { type: "object", properties: { employeeId: { type: "integer" } }, required: ["employeeId"] } }
          }
        },
        responses: { "200": { description: "Assigned" }, "404": { description: "Not Found" } }
      }
    },
    "/assets/{id}/unassign": {
      post: {
        tags: ["Assets"],
        summary: "Unassign asset",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "200": { description: "Unassigned" }, "404": { description: "Not Found" } }
      }
    },
    "/repairs": {
      get: { tags: ["Repairs"], summary: "Get all repair requests", responses: { "200": { description: "OK" } } },
      post: {
        tags: ["Repairs"],
        summary: "Create a repair request",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Repair" } }
          }
        },
        responses: { "201": { description: "Created" } }
      }
    },
    "/repairs/{id}": {
      get: {
        tags: ["Repairs"],
        summary: "Get repair by ID",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "200": { description: "OK" }, "404": { description: "Not Found" } }
      },
      put: {
        tags: ["Repairs"],
        summary: "Update repair",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/Repair" } }
          }
        },
        responses: { "200": { description: "Updated" }, "404": { description: "Not Found" } }
      },
      delete: {
        tags: ["Repairs"],
        summary: "Delete repair",
        parameters: [ { name: "id", in: "path", required: true, schema: { type: "integer" } } ],
        responses: { "204": { description: "Deleted" }, "404": { description: "Not Found" } }
      }
    }
  }
};
