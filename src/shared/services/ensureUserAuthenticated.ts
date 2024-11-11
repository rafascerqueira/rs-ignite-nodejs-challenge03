import { env } from "src/env";
import { JWTservice } from "./JWTservice";
import { FastifyReply, FastifyRequest } from "fastify";

const jwtService = new JWTservice(env.JWT_SECRET);

export default async function ensureUserAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({
      errorCode: "unauthorized",
    });
  }

  const [_, token] = authHeader.split(" ");

  jwtService.verifyToken(token);
}
