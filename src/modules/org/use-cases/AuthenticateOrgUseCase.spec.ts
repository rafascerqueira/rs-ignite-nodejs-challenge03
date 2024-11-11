import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "@repositories/in-memory/in-memory-org-repository";
import { AuthenticateOrgUseCase } from "./AuthenticateOrgUseCase";
import { CreateOrgUseCase } from "./CreateOrgUseCase";

describe("AuthenticateOrgUseCase", () => {
  let createOrgUseCase: CreateOrgUseCase;
  let authenticateOrgUseCase: AuthenticateOrgUseCase;
  let orgRepository: InMemoryOrgRepository;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    createOrgUseCase = new CreateOrgUseCase(orgRepository);
    authenticateOrgUseCase = new AuthenticateOrgUseCase(orgRepository);
  });

  it("should be able for an Org to sign in application", async () => {
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
        await authenticateOrgUseCase.execute({
          whatsapp: "540-236-2758",
          password: "tL1#kjKTQX%",
        })
    ).toBeTruthy();
  });

  it("should not be able for an Org to sign in application with wrong password", async () => {
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
        await authenticateOrgUseCase.execute({
          whatsapp: "540-236-2758",
          password: "wrong-password",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
