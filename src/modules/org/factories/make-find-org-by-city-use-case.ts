import { OrgsRepository } from "@repositories/prisma/OrgsRepository";
import { FindOrgByCityUseCase } from "../use-cases/FindOrgByCityUseCase";

export function makeFindOrgByCityUseCase() {
  return new FindOrgByCityUseCase(new OrgsRepository());
}
