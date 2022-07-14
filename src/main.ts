import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});

	const config = new DocumentBuilder()
		.setTitle("Movies Crud")
		.setDescription("Application test")
		.setVersion("1.0")
		.addTag("Movies")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(process.env.PORT);
}
bootstrap();
