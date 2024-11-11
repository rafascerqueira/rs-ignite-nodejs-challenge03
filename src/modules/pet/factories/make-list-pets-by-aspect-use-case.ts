import { PetsRepository } from "@repositories/prisma/PetsRepository";
import { ListPetsByAspectUseCase } from "../use-cases/ListPetsByAspectUseCase";


export function makeListPetsByAspectUseCase() {
  return new ListPetsByAspectUseCase(new PetsRepository());
}