import { FastifyReply, FastifyRequest } from "fastify";
import { makeListAllPetsAvailableUseCase } from "../factories/make-list-all-Pets-available-use-case";
import { z } from "zod";
import { AppError } from "src/shared/errors/appError";

const bodySchema = z.object({
  city: z.string(),
});

export class ListAllPetsAvailableController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { city } = bodySchema.parse(request.query);

    const petsUseCase = makeListAllPetsAvailableUseCase();

    try {
      const pets = await petsUseCase.execute(city);
      return reply.status(200).send({ pets });
    } catch (error: any) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: error.message,
        });
      }

      return reply
        .status(500)
        .send({ error: "An unexpected error has occurred", stack: error });
    }
  }
}
