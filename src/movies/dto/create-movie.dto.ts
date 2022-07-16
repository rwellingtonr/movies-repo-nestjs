import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
	@ApiProperty({ example: "uuid", readOnly: true })
	id?: string;

	@ApiProperty({ example: "O poderoso chefão", required: true })
	name: string;

	@ApiProperty({ example: 180, required: true, type: Number })
	duration: number;

	@ApiProperty({ example: "Filme de dramaturgia", required: true })
	description: string;

	@ApiProperty({ example: "uuid", required: true })
	category_id: string;

	@ApiProperty({ type: Date, readOnly: true })
	created_at: Date;
}
