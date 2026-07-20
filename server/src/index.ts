import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log("======================================");
      console.log("🚀 LeadForge AI Server Started");
      console.log(`🌐 Server: http://localhost:${env.PORT}`);
      console.log(`📅 Started: ${new Date().toLocaleString()}`);
      console.log("======================================");
    });
  } catch (error) {
    console.error("Failed to start server");
    process.exit(1);
  }
};

startServer();