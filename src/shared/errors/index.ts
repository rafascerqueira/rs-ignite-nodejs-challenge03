import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AppError } from "./appError";
import { env } from "src/env";

export default function handleError(
  error: any,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof z.ZodError) {
    return reply.status(400).send({
      status: "error",
      message: "Validatioin error",
      issues: error.format(),
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }

  if (error instanceof Error) {
    return reply.status(503).send({
      error: error.message,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.warn(error);
  } else {
    // monitoring service
  }

  return reply.status(500).send({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
}
