import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";
import { IOrg } from "../DTO/IOrg";
import { passwordHash } from "src/shared/services/cryptoPassword";
import { AppError } from "src/shared/errors/appError";

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    name,
    address,
    neighborhood,
    city,
    whatsapp,
    password,
  }: IOrg) {
    const org = await this.orgsRepository.findByWhatsapp(whatsapp);

    if (org) {
      throw new AppError("Org already exists");
    }

    const { hash, salt } = passwordHash(password);

    const payload = {
      name,
      address,
      neighborhood,
      city,
      whatsapp,
      password_hash: hash,
      salt,
    };

    return await this.orgsRepository.create(payload);
  }
}
