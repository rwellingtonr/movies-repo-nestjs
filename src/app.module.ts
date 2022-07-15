import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MoviesModule } from "./movies/movies.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
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
		}),
		MoviesModule,
		CategoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
