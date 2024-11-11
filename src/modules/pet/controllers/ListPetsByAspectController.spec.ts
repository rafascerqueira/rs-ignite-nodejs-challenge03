import request from "supertest";
import { app } from "src/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("ListPetsByAspectController (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list pets by aspect", async () => {
    await request(app.server).post("/orgs/create").send({
      name: "Herzog, Olson and Anderson",
      address: "64807 Mallory Point",
      neighborhood: "Dottie",
      city: "Celestynów",
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    const authResponse = await request(app.server).post("/orgs/login").send({
      whatsapp: "540-236-2758",
      password: "tL1#kjKTQX%",
    });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.authenticate_token}`)
      .send({
        name: "Gojira",
        age: "1",
        size: "middle",
        weight: "2",
        description: "a little lizard",
        species: "lizard",
      });

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${authResponse.body.authenticate_token}`)
      .send({
        name: "Beawolf",
        age: "3",
        size: "big",
        weight: "2",
        description: "a huge Lupus",
        species: "wolf",
      });

    const response = await request(app.server)
      .post("/pets/list/by-aspect")
      .send({ city: "Celestynów" });

    const response2 = await request(app.server)
      .post("/pets/list/by-aspect")
      .send({ city: "Celestynów", species: "lizard" });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response2.status).toBe(200);
    expect(response2.body.pets).toHaveLength(1);
  });
});
