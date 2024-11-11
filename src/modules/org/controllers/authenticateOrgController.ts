import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateOrgUseCase } from "../factories/make-authenticate-org-use-case";
import { AppError } from "src/shared/errors/appError";

const bodySchema = z.object({
  whatsapp: z.string(),
  password: z.string(),
});

export class AuthenticateOrgController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const payload = bodySchema.parse(request.body);

    const orgsUseCase = makeAuthenticateOrgUseCase();

    try {
      const authenticate_token = await orgsUseCase.execute(payload);

      return reply.status(200).send({ authenticate_token });
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
