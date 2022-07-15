import { Movies } from "./entities/movies.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
	private logger = new Logger(MoviesService.name);
	constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>) {}

	private formatName(name: string) {
		return name.toLowerCase();
	}

	async create(createMovieDto: CreateMovieDto) {
		this.logger.log("Adding movie");

		const name = this.formatName(createMovieDto.name);

		const alreadyExists = await this.moviesRepository.findOne({ where: { name } });
		console.log(alreadyExists);

		if (alreadyExists) {
			throw { code: 409, message: "This movie already exists" };
		}

		const movie = this.moviesRepository.create({ ...createMovieDto, name });
		this.logger.log("Saving movie");
		return await this.moviesRepository.save(movie);
	}

	async findAll() {
		this.logger.log("Looking for all movies");
		return await this.moviesRepository.find();
	}

	async findOne(id: string) {
		const movie = await this.moviesRepository.findOne({ where: { id } });
		if (!movie) throw new Error("Could not find this movie");

		this.logger.log(`Getting movie ${movie.name}`);
		return movie;
	}

	async update(id: string, { description }: UpdateMovieDto) {
		const movie = await this.moviesRepository.findOne({ where: { id } });
		if (!movie) throw new Error("Could not find this movie");

		this.logger.log(`Updating description from movie ${movie.name}`);

		movie.description = description;

		return await this.moviesRepository.save(movie);
	}

	async remove(id: string) {
		this.logger.log(`Removing movie id ${id}`);
		return await this.moviesRepository.delete(id);
	}
}
