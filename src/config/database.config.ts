import "dotenv/config";

const basicDBInfo = {
	type: "postgres",
	entities: [__dirname + "./../**/*.entity{.ts,.js}"],
	synchronize: true,
	logging: false,
	subscribers: [],
	migrations: [],
};

export const databaseConfig = {
	prod: {
		...basicDBInfo,
		url: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	},
	dev: {
		...basicDBInfo,
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PSW,
		database: process.env.DATABASE,
	},
};
