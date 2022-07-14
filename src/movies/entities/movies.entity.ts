import Category from "./category.entity";
import { v4 as uuid } from "uuid";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("movies")
export default class Videos {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar")
	description: string;

	@Column("int")
	duration: number;

	@Column("uuid")
	category_id: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: "category_id" })
	category: Category;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) this.id = uuid();
	}
}
