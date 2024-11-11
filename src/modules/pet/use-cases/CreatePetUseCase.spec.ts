import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from "@repositories/in-memory/in-memory-org-repository";
import { CreatePetUseCase } from "./CreatePetUseCase";
import { CreateOrgUseCase } from "@modules/org/use-cases/CreateOrgUseCase";

describe("CreatePetUseCase", () => {
  let createPetUseCase: CreatePetUseCase;
  let createOrgUseCase: CreateOrgUseCase;
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;

  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, orgRepository);
    createOrgUseCase = new CreateOrgUseCase(orgRepository);
  });

  it("should be able to create a new pet", async () => {
    const org = await createOrgUseCase.execute({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const pet = await createPetUseCase.execute({
      name: "Gojira",
      age: "1",
      size: "small",
      weight: "2",
      description: "a litle lizard",
      species: "bird",
      org_id: org.id,
    });
    expect(pet).toHaveProperty("id");
  });

  it("should not be able to create a pet without a valid org", async () => {
    expect(
      async () =>
        await createPetUseCase.execute({
          name: "Gojira",
          age: "1",
          size: "small",
          weight: "2",
          description: "a litle lizard",
          species: "bird",
          org_id: "invalid-org-id",
        })
    ).rejects.toThrowError();
  });
});
