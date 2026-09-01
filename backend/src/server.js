import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import prisma from './db/prisma.js';
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js"
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter);

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