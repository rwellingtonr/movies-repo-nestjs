import Movies from "./movies.entity";
import { DataSource } from "typeorm";

export const moviesProviders = [
	{
		provide: "MOVIES_REPOSITORY",
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Movies),
		inject: ["DATA_SOURCE"],
	},
];
