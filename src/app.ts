import "reflect-metadata";
import fastify from "fastify";
import { orgRoutes } from "./shared/routes/org.routes";
import { petRoutes } from "./shared/routes/pet.routes";
import handleError from "./shared/errors";

export const app = fastify();

app.register(orgRoutes, { prefix: "/orgs" });
app.register(petRoutes, { prefix: "/pets" });

app.setErrorHandler(handleError)