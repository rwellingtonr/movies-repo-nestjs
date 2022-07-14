import Category from "./category.entity";
import { DataSource } from "typeorm";

export const categoryProviders = [
	{
		provide: "CATEGORY_REPOSITORY",
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
		inject: ["DATA_SOURCE"],
	},
];
