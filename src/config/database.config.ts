import "dotenv/config";

const dbConfig = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PSW,
	database: process.env.DATABASE,
	synchronize: true,
	logging: true,
	entities: [__dirname + "/**/*.entity{.ts,.js}"],
	subscribers: [],
	migrations: [],
};

const databaseConfig = {
	prod: {
		...dbConfig,
		ssl: { rejectUnauthorized: false },
	},
	dev: dbConfig,
};

export { databaseConfig };
