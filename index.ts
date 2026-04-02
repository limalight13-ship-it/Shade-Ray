touch index.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "my-monetized-server",
  version: "1.0.0",
});

// Define a sample tool
server.tool(
  "hello",
  "Say hello to a user",
  { name: z.string().describe("Your name") },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: `Hello, ${name}!` }],
    };
  }
);

// Start the server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);