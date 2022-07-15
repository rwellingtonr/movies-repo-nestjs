import { Test, TestingModule } from "@nestjs/testing";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
	let service: MoviesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MoviesService],
		}).compile();

		service = module.get<MoviesService>(MoviesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	it("should create an movie", async () => {
		const movie: CreateMovieDto = {
			category_id: "drama",
			description: "Filme para refletir",
			duration: 180,
			name: "A cabana",
		};

		expect(await service.create(movie)).toBeInstanceOf(CreateMovieDto);
	});
});
