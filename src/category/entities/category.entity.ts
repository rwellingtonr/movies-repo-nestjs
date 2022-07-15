import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("categories")
export class Category {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar")
	description: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) this.id = uuid();
	}
}
