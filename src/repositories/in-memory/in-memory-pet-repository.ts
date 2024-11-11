import { Pet } from "src/entities/Pet";
import { IPetsRepository } from "@repositories/interfaces/IPetsRepository";
import { InMemoryOrgRepository } from "./in-memory-org-repository";
import { Prisma } from "@prisma/client";
import { IPetFilter } from "@modules/pet/DTO/IPetFilter";

export class InMemoryPetRepository implements IPetsRepository {
  public pets: Pet[] = [];

  constructor(private orgRepository: InMemoryOrgRepository) {}

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = new Pet();
    Object.assign(pet, data);
    this.pets.push({ ...pet });
    return { ...pet };
  }

  async list(city: string): Promise<Pet[] | null> {
    const orgs = await this.orgRepository.findByCity(city);

    if (!orgs) {
      return null;
    }

    const pets = this.pets.filter((pet) => {
      for (let org of orgs) {
        if (org.id === pet.org_id) {
          return pet;
        }
      }
    });

    return [...pets];
  }

  async findByAspect({
    city,
    age,
    size,
    weight,
    species,
  }: IPetFilter): Promise<Pet[] | null> {
    const petsByCity = await this.list(city);

    if (!petsByCity) {
      return null;
    }

    const pets = petsByCity
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) => (size ? pet.size === size : true))
      .filter((pet) => (weight ? pet.weight === weight : true))
      .filter((pet) => (species ? pet.species === species : true));

    if (!pets || pets === undefined) {
      return null;
    }

    return pets;
  }
}
