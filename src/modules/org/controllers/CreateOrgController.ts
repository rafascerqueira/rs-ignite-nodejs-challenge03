import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOrgUseCase } from "../factories/make-create-org-use-case";
import { excludeFields } from "src/shared/services/handleQueryEntityFields";
import { AppError } from "src/shared/errors/appError";
import { Org } from "@prisma/client";

const bodySchema = z.object({
  name: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  whatsapp: z.string(),
  password: z.string(),
});

export class CreateOrgController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const payload = bodySchema.parse(request.body);

    const orgsUseCase = makeCreateOrgUseCase();

    try {
      let org = await orgsUseCase.execute(payload);
      let orgReturn = excludeFields<Org, any>(org, ["password_hash", "salt"]);
      return reply.status(201).send(orgReturn);
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
