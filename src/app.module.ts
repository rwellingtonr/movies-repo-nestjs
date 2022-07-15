import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MoviesModule } from "./movies/movies.module";
import { CategoryModule } from "./category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(databaseConfig[process.env.NODE_STATUS]),
		MoviesModule,
		CategoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
