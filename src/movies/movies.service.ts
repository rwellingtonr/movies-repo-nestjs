import { Movies } from "./entities/movies.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
	private logger: Logger;
	constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>) {
		this.logger = new Logger(MoviesService.name);
	}

	async create(createMovieDto: CreateMovieDto) {
		this.logger.log("Adding movie");

		const { name } = createMovieDto;

		const alreadyExists = await this.moviesRepository.findOne({ where: { name } });
		if (alreadyExists) {
			throw { code: 409, message: "This movie already exists" };
		}

		const movie = this.moviesRepository.create(createMovieDto);

		return await this.moviesRepository.save(movie);
	}

	async findAll() {
		return await this.moviesRepository.find();
	}

	async findOne(id: string) {
		const movie = await this.moviesRepository.findOne({ where: { id } });
		if (!movie) throw new Error("Could not find this movie");

		return movie;
	}

	async update(id: string, updateMovieDto: UpdateMovieDto) {
		const movie = await this.moviesRepository.findOne({ where: { id } });
		if (!movie) throw new Error("Could not find this movie");
		const update = {
			...movie,
			...updateMovieDto,
		};

		return this.moviesRepository.save(update);
	}

	async remove(id: string) {
		return await this.moviesRepository.delete(id);
	}
}
