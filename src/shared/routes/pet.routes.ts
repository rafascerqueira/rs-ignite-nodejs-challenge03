import { CreatePetController } from "@modules/pet/controllers/CreatePetController";
import { ListAllPetsAvailableController } from "@modules/pet/controllers/ListAllPetsAvailableController";
import { ListPetsByAspectController } from "@modules/pet/controllers/ListPetsByAspectController";
import { FastifyInstance } from "fastify";
import ensureUserAuthenticated from "src/shared/services/ensureUserAuthenticated";

const createPetController = new CreatePetController();
const listAllPetsAvailableController = new ListAllPetsAvailableController();
const listPetsByAspectController = new ListPetsByAspectController();

export async function petRoutes(app: FastifyInstance) {
  app.post(
    "/",
    { onRequest: ensureUserAuthenticated },
    createPetController.handle
  );

  app.get("/list", listAllPetsAvailableController.handle);
  app.post("/list/by-aspect", listPetsByAspectController.handle);
}
