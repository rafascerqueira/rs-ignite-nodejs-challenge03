import { ICreatePayload } from "@modules/org/DTO/ICreatePayload";
import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";
import { Org } from "src/entities/Org";

export class InMemoryOrgRepository implements IOrgsRepository {
  public orgs: Org[] = [];

  async create(data: ICreatePayload): Promise<Org> {
    const org = new Org();
    Object.assign(org, data);
    this.orgs.push({ ...org });

    return { ...org };
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.orgs.find((org) => org.id === id);

    if (!org || org === undefined) {
      return null;
    }

    return org;
  }

  async findByWhatsapp(whatsapp: string): Promise<Org | null> {
    const org = this.orgs.find(
      (org) => org.whatsapp === whatsapp
    );

    if (!org || org === undefined) {
      return null;
    }

    return org;
  }

  async findByCity(city: string): Promise<Org[] | null> {
    return this.orgs.filter((org) => org.city === city);
  }
}
