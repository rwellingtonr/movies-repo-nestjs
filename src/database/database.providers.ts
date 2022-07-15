// import { DataSource } from "typeorm";
// import "dotenv/config";
// export const databaseProviders = [
// 	{
// 		provide: "DATA_SOURCE",
// 		useFactory: async () => {
// 			const dataSource = new DataSource({
// 				type: "postgres",
// 				host: process.env.DB_HOST,
// 				port: Number(process.env.DB_PORT),
// 				username: process.env.DE_USERNAME,
// 				password: process.env.DB_PSW,
// 				database: process.env.DATABASE,
// 				synchronize: true,
// 				logging: true,
// 				entities: [__dirname + "/../**/*.entity{.ts,.js}"],
// 				subscribers: [],
// 				migrations: [],
// 			});

// 			return dataSource.initialize();
// 		},
// 	},
// ];
