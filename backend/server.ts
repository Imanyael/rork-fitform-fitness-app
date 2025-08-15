import { serve } from "@hono/node-server";
import app from "./hono.js";

const port = parseInt(process.env.PORT || "3000", 10);

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
