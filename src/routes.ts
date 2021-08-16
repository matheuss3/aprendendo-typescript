import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/users', createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/peoples", ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, nome: "Matheus Oliveira" },
    { id: 2, nome: "Layla Lucht" },
    { id: 3, nome: "Thais de Souza" },
    { id: 4, nome: "Camila Volponi" },
    { id: 5, nome: "Solange Oliveira" },
    { id: 6, nome: "Wellington Oliveira" },
    { id: 7, nome: "João Pedro Oliveira" },
  ])
})

export { router };