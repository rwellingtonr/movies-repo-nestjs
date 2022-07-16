import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
	@ApiProperty({ type: String, required: false, readOnly: true })
	id?: string;

	@ApiProperty({ example: "Categoria com enfase na dramaturgia ", required: true })
	description: string;

	@ApiProperty({ example: "Drama", required: true })
	name: string;

	@ApiProperty({ type: Date, readOnly: true, required: false })
	created_at?: Date;
}
