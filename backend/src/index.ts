// src/index.ts
// Entry point — creates the Express app and starts the HTTP server

import { createApp } from "./server";

const PORT = parseInt(process.env.PORT ?? "3000", 10);
const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 RentWide API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV ?? "development"}`);
});
