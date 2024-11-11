import "dotenv/config";
import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";
import { ILoginPayload } from "../DTO/ILoginPayload";
import { verifyPassword } from "src/shared/services/cryptoPassword";
import { onlyFields } from "src/shared/services/handleQueryEntityFields";
import { JWTservice } from "src/shared/services/JWTservice";
import { AppError } from "src/shared/errors/appError";

const jwtService = new JWTservice(process.env.JWT_SECRET || "secret");

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({ whatsapp, password }: ILoginPayload) {
    const org = await this.orgsRepository.findByWhatsapp(whatsapp);

    if (!org) {
      throw new AppError("Org not found");
    }

    const { salt } = org;

    const passwordMatch = verifyPassword(password, salt, org.password_hash);

    if (!passwordMatch) {
      throw new Error("Password incorrect");
    }

    const { id: sub, name } = onlyFields(org, ["id", "name"]);
    const authenticate_token = jwtService.generateToken({ sub, name });

    return authenticate_token;
  }
}
