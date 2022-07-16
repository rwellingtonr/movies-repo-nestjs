import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { randomUUID } from "crypto";
import { CreateCategoryDto } from "src/category/dto/create-category.dto";

describe("AppController (e2e)", () => {
	let app: INestApplication;
	let category: CreateCategoryDto;
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		category = {
			description: "description",
			name: randomUUID(),
		};
	});

	it("/category (POST)", async () => {
		return request(app.getHttpServer())
			.post("/category")
			.send(category)
			.expect(201)
			.expect("Content-Type", /json/)
			.then((res) => {
				category.id = res.body.id;
				expect(res.body.name).toBe(category.name.toLowerCase());
			});
	});
	it("/category", () => {
		return request(app.getHttpServer()).get("/category").expect(200);
	});
});
