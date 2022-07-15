import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Response } from "express";

@Controller("movies")
export class MoviesController {
	private logger = new Logger(MoviesService.name);

	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	async create(@Res() res: Response, @Body() createMovieDto: CreateMovieDto) {
		try {
			const movie = await this.moviesService.create(createMovieDto);
			return res.status(HttpStatus.CREATED).json(movie);
		} catch (error) {
			this.logger.error(error.message);
			return res.status(error.code || 400).send({ message: error.message });
		}
	}

	@Get()
	async findAll() {
		return await this.moviesService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.moviesService.findOne(id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
		return await this.moviesService.update(id, updateMovieDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.moviesService.remove(id);
	}
}
