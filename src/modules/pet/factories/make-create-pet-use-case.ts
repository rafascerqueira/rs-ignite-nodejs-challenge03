import { PetsRepository } from "@repositories/prisma/PetsRepository";
import { CreatePetUseCase } from "../use-cases/CreatePetUseCase";
import { OrgsRepository } from "@repositories/prisma/OrgsRepository";

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(new PetsRepository(), new OrgsRepository());
}
