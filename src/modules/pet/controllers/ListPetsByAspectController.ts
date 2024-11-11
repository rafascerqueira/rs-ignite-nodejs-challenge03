import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "src/shared/errors/appError";
import { makeListPetsByAspectUseCase } from "../factories/make-list-pets-by-aspect-use-case";
import { z } from "zod";

const bodySchema = z.object({
  city: z.string(),
  size: z.string().optional(),
  weight: z.string().optional(),
  age: z.string().optional(),
  species: z.string().optional(),
})

export class ListPetsByAspectController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const aspect = bodySchema.parse(request.body);

    const petsUseCase = makeListPetsByAspectUseCase();

    try {
      const pets = await petsUseCase.execute(aspect);
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

