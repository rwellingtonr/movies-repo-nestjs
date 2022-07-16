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
import { ApiConflictResponse, ApiNotFoundResponse, ApiResponse } from "@nestjs/swagger";

@Controller("movies")
export class MoviesController {
	private logger = new Logger(MoviesService.name);

	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	@ApiConflictResponse({ description: "Conflito, nome da categoria deve ser única" })
	@ApiResponse({ status: 400, description: "Bad request" })
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
	@ApiResponse({
		status: 200,
		description: "Retorna todos os valores encontrados",
		isArray: true,
		type: CreateMovieDto,
	})
	@ApiResponse({ status: 400, description: "Bad request" })
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
	@ApiResponse({
		status: 200,
		description: "Retorna o valor encontrado pelo id",
		type: CreateMovieDto,
	})
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
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
	@ApiResponse({
		status: 200,
		description: "Retorna o valor com a descrição  atualizada",
		type: CreateMovieDto,
	})
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
	@ApiResponse({ status: 400, description: "Bad request" })
	async update(
		@Res() res: Response,
		@Param("id") id: string,
		@Body() updateMovieDto: UpdateMovieDto,
	) {
		try {
			const updatedMovie = await this.moviesService.update(id, updateMovieDto);
			return res.status(HttpStatus.OK).json(updatedMovie);
		} catch (error) {
			this.logger.error(error.message);
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Delete(":id")
	@ApiResponse({ status: 200, description: "Retorna vazio" })
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
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
