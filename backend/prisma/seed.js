import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
})

async function main() {
	console.log("🌱 Starting database seed...");

	// --------------------------------------------------
	// Users
	// --------------------------------------------------

	const password = await bcrypt.hash("password", 10);

	const cedric = await prisma.user.upsert({
		where: {
			email: "cedric@mail.com",
		},
		update: {
			name: "Cedric",
			password,
		},
		create: {
			name: "Cedric",
			email: "cedric@mail.com",
			password,
		},
	});

	const toto = await prisma.user.upsert({
		where: {
			email: "toto@mail.com",
		},
		update: {
			name: "Toto",
			password,
		},
		create: {
			name: "Toto",
			email: "toto@mail.com",
			password,
		},
	});

	console.log("✅ Users created");


	// --------------------------------------------------
	// Applications - Cedric
	// --------------------------------------------------

	await prisma.application.createMany({
		data: [
			{
				userId: cedric.id,
				companyName: "Amadeus",
				jobTitle: "Frontend Developer",
				location: "Sophia Antipolis",
				description: "Alternance Frontend Developer",
				applicationDate: new Date("2026-09-02"),
				applicationSource: "LINKEDIN",
				status: "APPLIED",
			},
			{
				userId: cedric.id,
				companyName: "Air France",
				jobTitle: "Fullstack Developer",
				location: "Nice",
				description: "Développement d'applications web",
				applicationDate: new Date("2026-08-30"),
				applicationSource: "COMPANY_WEBSITE",
				status: "INTERVIEW",
			},
			{
				userId: cedric.id,
				companyName: "Capgemini",
				jobTitle: "Software Developer",
				location: "Sophia Antipolis",
				description: "Alternance développement logiciel",
				applicationDate: new Date("2026-08-27"),
				applicationSource: "WELCOME_TO_THE_JUNGLE",
				status: "REJECTED",
			},
		],
	});


	// --------------------------------------------------
	// Applications - Toto
	// --------------------------------------------------

	await prisma.application.createMany({
		data: [
			{
				userId: toto.id,
				companyName: "Ubisoft",
				jobTitle: "Web Developer",
				location: "Montpellier",
				description: "Développement web",
				applicationDate: new Date("2026-09-01"),
				applicationSource: "INDEED",
				status: "SCREENING",
			},
			{
				userId: toto.id,
				companyName: "Google",
				jobTitle: "Software Engineer",
				location: "Paris",
				description: "Software engineering position",
				applicationDate: new Date("2026-08-28"),
				applicationSource: "COMPANY_WEBSITE",
				status: "OFFER",
			},
			{
				userId: toto.id,
				companyName: "Thales",
				jobTitle: "Backend Developer",
				location: "Sophia Antipolis",
				description: "Développement backend",
				applicationDate: new Date("2026-08-25"),
				applicationSource: "LINKEDIN",
				status: "DRAFT",
			},
		],
	});

	console.log("✅ Applications created");
	console.log("🌱 Database seeded successfully!");
}

main()
	.catch((error) => {
		console.error("❌ Seed failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});