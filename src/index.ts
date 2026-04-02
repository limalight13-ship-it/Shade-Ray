import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the server
const server = new McpServer({
  name: "my-monetized-server",
  version: "1.0.0",
});

// Tool 1: Hello world
server.tool(
  "hello",
  "Say hello to a user",
  { name: z.string().describe("Your name") },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }],
  })
);

// Tool 2: Example paid tool (e.g., Shopify orders)
server.tool(
  "get_shopify_orders",
  "Fetch recent orders from Shopify",
  { status: z.string().optional().describe("Order status, e.g., 'open'") },
  async ({ status = "any" }) => {
    // Replace with real API call
    const mockOrders = [{ id: 1, total: 99.99, status }];
    return {
      content: [{ type: "text", text: JSON.stringify(mockOrders, null, 2) }],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});