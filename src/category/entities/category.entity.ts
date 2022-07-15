import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", unique: true })
	name: string;

	@Column("varchar")
	description: string;

	@CreateDateColumn()
	created_at: Date;
}
