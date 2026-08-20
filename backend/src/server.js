import express from 'express';
import cookieParser from "cookie-parser";
import prisma from './db/prisma.js';
import authRouter from "./routes/authRoutes.js";
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);

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