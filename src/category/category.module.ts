import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { DatabaseModule } from "src/database/database.module";
import { categoryProviders } from "./entities/category.providers";

@Module({
	imports: [DatabaseModule],
	controllers: [CategoryController],
	providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
