import { IPetsRepository } from "@repositories/interfaces/IPetsRepository";
import { Pet, Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { IPetFilter } from "@modules/pet/DTO/IPetFilter";

export class PetsRepository implements IPetsRepository {
  private repository: PrismaClient;
  constructor() {
    this.repository = prisma;
  }

  async findByAspect({
    age,
    size,
    weight,
    species,
    city,
  }: IPetFilter): Promise<Pet[] | null> {
    return await this.repository.pet.findMany({
      where: {
        age,
        size,
        weight,
        species,
        org: {
          city,
        },
      },
    });
  }

  async list(city: string): Promise<Pet[] | null> {
    return await this.repository.pet.findMany({
      where: {
        org: {
          city,
        },
      },
    });
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    return await this.repository.pet.create({ data });
  }
}
