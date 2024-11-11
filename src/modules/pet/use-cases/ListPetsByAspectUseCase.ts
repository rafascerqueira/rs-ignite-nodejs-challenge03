import { IPetsRepository } from "@repositories/interfaces/IPetsRepository";
import { IPetFilter } from "../DTO/IPetFilter";
import { Pet } from "@prisma/client";

export class ListPetsByAspectUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    size,
    weight,
    species,
  }: IPetFilter): Promise<Pet[] | null> {
    return await this.petsRepository.findByAspect({
      city,
      age,
      size,
      weight,
      species,
    });
  }
}
