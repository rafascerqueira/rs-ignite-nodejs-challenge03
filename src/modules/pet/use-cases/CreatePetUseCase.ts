import { IPetsRepository } from "@repositories/interfaces/IPetsRepository";
import { IPet } from "../DTO/IPet";
import { AppError } from "src/shared/errors/appError";
import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository
  ) {}

  async execute(data: IPet) {
    const { org_id } = data;
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new AppError("Org not found", 404);
    }

    return await this.petsRepository.create(data);
  }
}
