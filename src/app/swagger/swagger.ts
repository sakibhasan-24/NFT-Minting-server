import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NFT Minting API",
      version: "1.0.0",
      description: "API for storing and retrieving NFT metadata",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
