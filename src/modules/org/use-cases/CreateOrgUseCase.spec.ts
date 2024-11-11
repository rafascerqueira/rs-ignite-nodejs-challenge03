import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "@repositories/in-memory/in-memory-org-repository";
import { CreateOrgUseCase } from "./CreateOrgUseCase";

describe("CreateOrgUseCase", () => {
  let createOrgUseCase: CreateOrgUseCase;
  let orgRepository: InMemoryOrgRepository;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    createOrgUseCase = new CreateOrgUseCase(orgRepository);
  });

  it("should be able to create a new org", async () => {
    const org = await createOrgUseCase.execute({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    expect(org).toHaveProperty("id");
  });

  it("should not be able to create a org with same whatsapp", async () => {
    await createOrgUseCase.execute({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    expect(
      async () =>
        await createOrgUseCase.execute({
          name: "Keebler, Blick and Sawayn",
          address: "3972 Esch Pass",
          neighborhood: "Lindbergh",
          city: "Köln",
          whatsapp: "540-236-2758",
          password: "oY5%&|3o",
        })
    ).rejects.toThrowError();
  });
});
