import { ICreatePayload } from "@modules/org/DTO/ICreatePayload";
import { ILoginPayload } from "@modules/org/DTO/ILoginPayload";
import { Org } from "@prisma/client";

export interface IOrgsRepository {
  create(data: ICreatePayload): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByWhatsapp(whatsapp: string): Promise<Org | null>;
  findByCity(city: string): Promise<Org[] | null>;
}
