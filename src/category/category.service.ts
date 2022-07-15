import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./entities/category.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

	private formatName(name: string) {
		return name.toLowerCase();
	}

	async create(createCategoryDto: CreateCategoryDto) {
		const name = this.formatName(createCategoryDto.name);

		const exists = await this.categoryRepository.findOne({ where: { name } });

		if (exists) throw { message: "Already exists", code: 409 };

		const category = this.categoryRepository.create({ ...createCategoryDto, name });

		return await this.categoryRepository.save(category);
	}

	async findAll() {
		return await this.categoryRepository.find();
	}

	async findOne(id: string) {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) throw new Error("Could not find this category");

		return category;
	}

	async update(id: string, { description }: UpdateCategoryDto) {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) throw { code: 404, message: "Could not find this movie" };

		category.description = description;

		return await this.categoryRepository.save(category);
	}

	async remove(id: string) {
		return await this.categoryRepository.delete(id);
	}
}
