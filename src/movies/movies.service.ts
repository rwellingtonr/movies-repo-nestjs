import Movies from "./entities/movies.entity";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
	constructor(@Inject("MOVIES_REPOSITORY") private categoryRepository: Repository<Movies>) {}

	create(createMovieDto: CreateMovieDto) {
		return "This action adds a new movie";
	}

	findAll() {
		return `This action returns all movies`;
	}

	findOne(id: string) {
		return `This action returns a #${id} movie`;
	}

	update(id: string, updateMovieDto: UpdateMovieDto) {
		return `This action updates a #${id} movie`;
	}

	remove(id: string) {
		return `This action removes a #${id} movie`;
	}
}
