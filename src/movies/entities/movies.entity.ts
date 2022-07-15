import { Category } from "../../category/entities/category.entity";
import {
	Entity,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("movies")
export class Movies {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", unique: true })
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
}
