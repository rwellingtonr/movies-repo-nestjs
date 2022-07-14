import Category from "../../category/entities/category.entity";
import { v4 as uuid } from "uuid";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("movies")
export default class Movies {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar")
	description: string;

	@Column("float")
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
