import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	async create(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto) {
		try {
			const category = await this.categoryService.create(createCategoryDto);
			return res.status(HttpStatus.CREATED).json(category);
		} catch (error) {
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Get()
	async findAll(@Res() res: Response) {
		try {
			return await this.categoryService.findAll();
		} catch (error) {
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}

	@Get(":id")
	async findOne(@Res() res: Response, @Param("id") id: string) {
		try {
			return await this.categoryService.findOne(id);
		} catch (error) {
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
			return await this.categoryService.update(id, updateCategoryDto);
		} catch (error) {
			return res.status(error.code || HttpStatus.BAD_REQUEST).send(error.message);
		}
	}

	@Delete(":id")
	async remove(@Res() res: Response, @Param("id") id: string) {
		try {
			return await this.categoryService.remove(id);
		} catch (error) {
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}
	}
}
