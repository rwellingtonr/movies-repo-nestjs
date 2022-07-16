import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
	@ApiProperty({ example: "Categoria com enfase na dramaturgia ", required: true })
	description?: string;
}
