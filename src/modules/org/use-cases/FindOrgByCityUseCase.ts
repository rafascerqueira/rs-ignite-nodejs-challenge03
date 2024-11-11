import { Org } from "@prisma/client";
import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";
import { AppError } from "src/shared/errors/appError";

export class FindOrgByCityUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({ city }: { city: string }): Promise<Org[] | null> {
    const org = await this.orgsRepository.findByCity(city);

    if (!Array.isArray(org)) {
      throw new AppError("Org not found", 404);
    }

    return org;
  }
}
