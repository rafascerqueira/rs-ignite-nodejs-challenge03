import { PetsRepository } from "@repositories/prisma/PetsRepository";
import { ListAllPetsAvailableUseCase } from "../use-cases/ListAllPetsAvailableUseCase";

export function makeListAllPetsAvailableUseCase() {
  return new ListAllPetsAvailableUseCase(new PetsRepository());
}
