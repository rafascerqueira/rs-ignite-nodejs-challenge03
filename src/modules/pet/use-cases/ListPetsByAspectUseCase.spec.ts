import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./CreatePetUseCase";
import { InMemoryPetRepository } from "@repositories/in-memory/in-memory-pet-repository";
import { CreateOrgUseCase } from "@modules/org/use-cases/CreateOrgUseCase";
import { InMemoryOrgRepository } from "@repositories/in-memory/in-memory-org-repository";
import { ListPetsByAspectUseCase } from "./ListPetsByAspectUseCase";

describe("ListPetsByAspectUseCase", () => {
  let listPetsByAspectUseCase: ListPetsByAspectUseCase;
  let createPetUseCase: CreatePetUseCase;
  let createOrgUseCase: CreateOrgUseCase;
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;

  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, orgRepository);
    createOrgUseCase = new CreateOrgUseCase(orgRepository);
    listPetsByAspectUseCase = new ListPetsByAspectUseCase(petRepository);
  });

  it("should be able to list all pets available", async () => {
    const org = await createOrgUseCase.execute({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const another_org = await createOrgUseCase.execute({
      name: "Langosh, Streich and Gislason",
      address: "3 Vahlen Court",
      neighborhood: "ACNE SOLUTIONS",
      city: "Beiyuan",
      whatsapp: "782-630-5710",
      password: "iA6>VFjGmMr",
    });

    await createPetUseCase.execute({
      name: "Gojira",
      age: "1",
      size: "middle",
      weight: "2",
      description: "a little dog",
      species: "lizard",
      org_id: org.id,
    });

    await createPetUseCase.execute({
      name: "Corgi",
      age: "1",
      size: "small",
      weight: "2",
      description: "a little dog",
      species: "cat",
      org_id: org.id,
    });

    await createPetUseCase.execute({
      name: "Poodle",
      age: "2",
      size: "large",
      weight: "2",
      description: "a little dog",
      species: "dog",
      org_id: another_org.id,
    });

    const listPets = await listPetsByAspectUseCase.execute({
      city: "Celestynów",
      size: "middle",
      species: "lizard",
    });

    const listPets2 = await listPetsByAspectUseCase.execute({
      city: "Celestynów",
      size: "middle",
      species: "cat",
    });

    expect(listPets).toHaveLength(1);
    expect(listPets2).toHaveLength(0);
  });
});
