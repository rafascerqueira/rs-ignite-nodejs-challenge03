import { IPetFilter } from "@modules/pet/DTO/IPetFilter";
import { Pet, Prisma } from "@prisma/client";

export interface IPetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>;
  list(city: string): Promise<Pet[] | null>;
  findByAspect(aspect: IPetFilter): Promise<Pet[] | null>;
}
