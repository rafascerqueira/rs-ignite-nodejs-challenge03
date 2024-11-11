import { IPetsRepository } from "@repositories/interfaces/IPetsRepository";
import { AppError } from "src/shared/errors/appError";
import { Pet } from "@prisma/client";

export class ListAllPetsAvailableUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(city: string): Promise<Pet[] | null> {
    if (!city) {
      throw new AppError("City is required");
    }

    return await this.petsRepository.list(city);
  }
}
