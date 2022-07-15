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
	async findAll(@Res() res: Response) {
		try {
			const movies = await this.moviesService.findAll();
			return res.status(HttpStatus.OK).json(movies);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}

	@Get(":id")
	async findOne(@Res() res: Response, @Param("id") id: string) {
		try {
			const movie = await this.moviesService.findOne(id);
			return res.status(HttpStatus.OK).json(movie);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}

	@Patch(":id")
	async update(
		@Res() res: Response,
		@Param("id") id: string,
		@Body() updateMovieDto: UpdateMovieDto,
	) {
		try {
			await this.moviesService.update(id, updateMovieDto);
			return res.status(HttpStatus.OK).json();
		} catch (error) {
			this.logger.error(error.message);
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Delete(":id")
	async remove(@Res() res: Response, @Param("id") id: string) {
		try {
			await this.moviesService.remove(id);
			return res.sendStatus(HttpStatus.OK);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}
}
