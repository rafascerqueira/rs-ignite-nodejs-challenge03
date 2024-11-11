import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "../factories/make-create-pet-use-case";
import { JWTservice } from "src/shared/services/JWTservice";
import { env } from "src/env";
import { AppError } from "src/shared/errors/appError";

const bodySchema = z.object({
  name: z.string(),
  age: z.string(),
  size: z.string(),
  weight: z.string(),
  description: z.string(),
  species: z.string(),
});

const jwtService = new JWTservice(env.JWT_SECRET);

export class CreatePetController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const payload = bodySchema.parse(request.body);
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        errorCode: "unauthorized",
      });
    }

    const [_, token] = authHeader.split(" ");

    const org_id = jwtService.decodeToken(token)?.sub as string;

    if (!org_id) {
      return reply.status(401).send({
        errorCode: "unauthorized",
      });
    }

    const petsUseCase = makeCreatePetUseCase();

    const petData = { ...payload, org_id };

    try {
      await petsUseCase.execute(petData);
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

    return reply.status(201).send();
  }
}
