import express from 'express'

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
	
  } catch (error) {
    console.error("Unable to connect to database", error);
    process.exit(1);
  }
}

startServer();