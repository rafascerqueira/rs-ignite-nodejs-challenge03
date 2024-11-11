import { Org, PrismaClient, Prisma } from "@prisma/client";
import { IOrgsRepository } from "@repositories/interfaces/IOrgsRepository";
import { prisma } from "src/lib/prisma";

export class OrgsRepository implements IOrgsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await this.repository.org.create({ data });
  }

  async findById(id: string): Promise<Org | null> {
    return this.repository.org.findUnique({ where: { id } });
  }

  async findByWhatsapp(whatsapp: string): Promise<Org | null> {
    return await this.repository.org.findFirst({
      where: {
        whatsapp,
      },
    });
  }

  async findByCity(city: string): Promise<Org[] | null> {
    return await this.repository.org.findMany({
      where: {
        city,
      },
    });
  }
}
