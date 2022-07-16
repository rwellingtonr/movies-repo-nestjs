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
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiResponse,
} from "@nestjs/swagger";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
	private logger = new Logger(CategoryController.name);
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiCreatedResponse({
		description: "Retorno o objeto criado",
		type: CreateCategoryDto,
	})
	@ApiResponse({ status: 400, description: "Bad request" })
	@ApiConflictResponse({ description: "Conflito, nome da categoria deve ser única" })
	async create(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto) {
		try {
			const category = await this.categoryService.create(createCategoryDto);
			return res.status(HttpStatus.CREATED).json(category);
		} catch (error) {
			this.logger.error(error.message);
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Get()
	@ApiResponse({
		status: 200,
		description: "Retorna array os campos encontrados",
		isArray: true,
		type: CreateCategoryDto,
	})
	@ApiResponse({ status: 400, description: "Bad request" })
	async findAll(@Res() res: Response) {
		try {
			const categories = await this.categoryService.findAll();
			return res.status(HttpStatus.OK).json(categories);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}
	}

	@Get(":id")
	@ApiResponse({
		status: 200,
		description: "Retorna a categoria encontrada",
		type: CreateCategoryDto,
	})
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
	async findOne(@Res() res: Response, @Param("id") id: string) {
		try {
			const category = await this.categoryService.findOne(id);
			return res.status(HttpStatus.OK).json(category);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}

	@Patch(":id")
	@ApiResponse({
		status: 200,
		description: "Retorna a categoria encontrada e com a descrição atualizada",
		type: CreateCategoryDto,
	})
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
	@ApiResponse({ status: 400, description: "Bad request" })
	async update(
		@Res() res: Response,
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		try {
			const updated = await this.categoryService.update(id, updateCategoryDto);
			return res.status(HttpStatus.OK).json(updated);
		} catch (error) {
			this.logger.error(error.message);
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Delete(":id")
	@ApiResponse({
		status: 200,
		description: "Retorno vazio",
	})
	@ApiNotFoundResponse({ description: "Não foi possível encontrar pelo id" })
	async remove(@Res() res: Response, @Param("id") id: string) {
		try {
			await this.categoryService.remove(id);
			return res.sendStatus(HttpStatus.OK);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}
}
