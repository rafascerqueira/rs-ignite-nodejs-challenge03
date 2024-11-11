import "reflect-metadata";
import "dotenv/config";
import { OrgsRepository } from "@repositories/prisma/OrgsRepository";
import { CreateOrgUseCase } from "../use-cases/CreateOrgUseCase";

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new OrgsRepository());
}
