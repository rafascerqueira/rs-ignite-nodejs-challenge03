import { beforeEach, describe, expect, it } from "vitest";
import { FindOrgByCityUseCase } from "./FindOrgByCityUseCase";
import { InMemoryOrgRepository } from "@repositories/in-memory/in-memory-org-repository";
import { CreateOrgUseCase } from "./CreateOrgUseCase";

describe("FindOrgByCityUseCase", () => {
  let findOrgByCityUseCase: FindOrgByCityUseCase;
  let createOrgUseCase: CreateOrgUseCase;
  let orgsRepository: InMemoryOrgRepository;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    createOrgUseCase = new CreateOrgUseCase(orgsRepository);
    findOrgByCityUseCase = new FindOrgByCityUseCase(orgsRepository);
  });

  it("should be able to find org by city", async () => {
    await createOrgUseCase.execute({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    await createOrgUseCase.execute({
      name: "Langosh, Streich and Gislason",
      address: "3 Vahlen Court",
      neighborhood: "ACNE SOLUTIONS",
      city: "Beiyuan",
      whatsapp: "782-630-5710",
      password: "iA6>VFjGmMr",
    });

    const orgs = await findOrgByCityUseCase.execute({ city: "Celestynów" });
    const emptyOrgs = await findOrgByCityUseCase.execute({ city: "kyev" });
    expect(orgs).toHaveLength(1);
    expect(emptyOrgs).toHaveLength(0);
  });
});
