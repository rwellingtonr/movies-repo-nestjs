import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { MoviesModule } from "./movies/movies.module";
import { CategoryModule } from "./category/category.module";

@Module({
	imports: [MoviesModule, CategoryModule, ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
