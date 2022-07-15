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
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
	private logger = new Logger(CategoryController.name);
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
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
	async findAll(@Res() res: Response) {
		try {
			const categories = await this.categoryService.findAll();
			return res.status(HttpStatus.OK).json(categories);
		} catch (error) {
			this.logger.error(error.message);
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}

	@Get(":id")
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
