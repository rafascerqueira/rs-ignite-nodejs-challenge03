import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindOrgByCityUseCase } from "../factories/make-find-org-by-city-use-case";
import { z } from "zod";
import { AppError } from "src/shared/errors/appError";

const bodySchema = z.object({
  city: z.string(),
});

export class FindOrgByCityController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { city } = bodySchema.parse(request.query);

    const orgsUseCase = makeFindOrgByCityUseCase();

    try {
      const orgs = await orgsUseCase.execute({ city });
      return reply.status(200).send(orgs);
      
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
