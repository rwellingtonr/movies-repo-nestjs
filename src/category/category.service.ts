import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./entities/category.entity";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
	private logger = new Logger(CategoryService.name);
	constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

	private formatName(name: string) {
		return name.toLowerCase();
	}

	async create(createCategoryDto: CreateCategoryDto) {
		const name = this.formatName(createCategoryDto.name);
		this.logger.log(`Creating category ${name}`);

		const exists = await this.categoryRepository.findOne({ where: { name } });

		if (exists) throw { message: "Already exists", code: 409 };

		const category = this.categoryRepository.create({ ...createCategoryDto, name });
		this.logger.log("Saving category...");
		return await this.categoryRepository.save(category);
	}

	async findAll() {
		this.logger.log("Retrieving all categories");
		return await this.categoryRepository.find();
	}

	async findOne(id: string) {
		this.logger.log(`Looking for category id ${id}`);
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) throw new Error("Could not find this category");

		return category;
	}

	async update(id: string, { description }: UpdateCategoryDto) {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) throw { code: 404, message: "Could not find this movie" };
		this.logger.log("Updating category description");

		category.description = description;

		return await this.categoryRepository.save(category);
	}

	async remove(id: string) {
		this.logger.log(`Removing category id ${id}`);
		return await this.categoryRepository.delete(id);
	}
}
