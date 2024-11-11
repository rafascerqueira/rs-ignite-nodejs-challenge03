import { OrgsRepository } from "@repositories/prisma/OrgsRepository";
import { AuthenticateOrgUseCase } from "../use-cases/AuthenticateOrgUseCase";

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new OrgsRepository());
}
