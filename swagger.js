// swagger.js
module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Employee Asset Management API",
    version: "1.0.0",
    description: "API to manage employees, assets, and repair requests. Requires authentication."
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
    { name: "Repairs" },
    { name: "Auth" }
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
          name: { type: "string", example: "Alice Johnson" },
          role: { type: "string", example: "Developer" },
          department: { type: "string", example: "Engineering" }
        },
        required: ["name", "role", "department"]
      },
      Asset: {
        type: "object",
        properties: {
          type: { type: "string", example: "Laptop" },
          brand: { type: "string", example: "Dell" },
          serialNumber: { type: "string", example: "SN12345" }
        },
        required: ["type", "brand", "serialNumber"]
      },
      Repair: {
        type: "object",
        properties: {
          employeeId: { type: "integer", example: 1 },
          assetId: { type: "integer", example: 2 },
          description: { type: "string", example: "Screen flickering" }
        },
        required: ["employeeId", "assetId", "description"]
      },
      LoginRequest: {
        type: "object",
        properties: {
          username: { type: "string", example: "admin" },
          password: { type: "string", example: "password" }
        },
        required: ["username", "password"]
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          expiresIn: { type: "integer", example: 3600 }
        }
      }
    }
  },
  security: [
    { bearerAuth: [] }
  ],
  paths: {
    "/login": {
      post: {
        tags: ["Auth"],
        summary: "Authenticate and get JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" }
            }
          }
        },
        responses: {
          200: {
            description: "Successful login",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/employees": {
      get: {
        tags: ["Employees"],
        summary: "Get all employees",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "OK" },
          500: { description: "Internal Server Error" }
        }
      },
      post: {
        tags: ["Employees"],
        summary: "Create a new employee",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Employee" }
            }
          }
        },
        responses: {
          201: { description: "Created" },
          400: { description: "Bad Request" }
        }
      }
    },
    "/employees/{id}": {
      get: {
        tags: ["Employees"],
        summary: "Get employee by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: {
          200: { description: "OK" },
          404: { description: "Not Found" }
        }
      },
      put: {
        tags: ["Employees"],
        summary: "Update employee",
        security: [{ bearerAuth: [] }],
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
        responses: { 200: { description: "Updated" }, 404: { description: "Not Found" } }
      },
      delete: {
        tags: ["Employees"],
        summary: "Delete employee",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 204: { description: "Deleted" }, 404: { description: "Not Found" } }
      }
    },
    "/employees/{id}/assets": {
      get: {
        tags: ["Employees"],
        summary: "Get assets assigned to an employee",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "OK" } }
      }
    },
    "/employees/{id}/repairs": {
      get: {
        tags: ["Employees"],
        summary: "Get repairs requested by an employee",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "OK" } }
      }
    },
    "/assets": {
      get: {
        tags: ["Assets"],
        summary: "Get all assets",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "OK" } }
      },
      post: {
        tags: ["Assets"],
        summary: "Create asset",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Asset" }
            }
          }
        },
        responses: { 201: { description: "Created" } }
      }
    },
    "/assets/{id}": {
      put: {
        tags: ["Assets"],
        summary: "Update asset",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Asset" }
            }
          }
        },
        responses: { 200: { description: "Updated" }, 404: { description: "Not Found" } }
      },
      delete: {
        tags: ["Assets"],
        summary: "Delete asset",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 204: { description: "Deleted" }, 404: { description: "Not Found" } }
      }
    },
    "/assets/{id}/assign": {
      post: {
        tags: ["Assets"],
        summary: "Assign asset to employee",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  employeeId: { type: "integer", example: 1 }
                },
                required: ["employeeId"]
              }
            }
          }
        },
        responses: { 200: { description: "Assigned" }, 404: { description: "Not Found" } }
      }
    },
    "/assets/{id}/unassign": {
      post: {
        tags: ["Assets"],
        summary: "Unassign asset",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "Unassigned" }, 404: { description: "Not Found" } }
      }
    },
    "/repairs": {
      get: {
        tags: ["Repairs"],
        summary: "Get all repair requests",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "OK" } }
      },
      post: {
        tags: ["Repairs"],
        summary: "Create a repair request",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Repair" }
            }
          }
        },
        responses: { 201: { description: "Created" } }
      }
    },
    "/repairs/{id}": {
      get: {
        tags: ["Repairs"],
        summary: "Get repair by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "OK" }, 404: { description: "Not Found" } }
      },
      put: {
        tags: ["Repairs"],
        summary: "Update repair",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Repair" }
            }
          }
        },
        responses: { 200: { description: "Updated" }, 404: { description: "Not Found" } }
      },
      delete: {
        tags: ["Repairs"],
        summary: "Delete repair",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 204: { description: "Deleted" }, 404: { description: "Not Found" } }
      }
    }
  }
};
