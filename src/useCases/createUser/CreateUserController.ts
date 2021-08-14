import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, name, password } = request.body

    const createUserUseCase = new CreateUserUseCase()

    try {
      const user = await createUserUseCase.execute({
        username,
        name,
        password
      });


      return response.json(user);
    } catch {
      return response.json({ menssage: "ERRO: Usuario existente" })
    }

  }
}

export { CreateUserController }