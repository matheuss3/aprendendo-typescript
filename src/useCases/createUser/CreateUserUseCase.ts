import { client } from '../../prisma/client'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verificando se o usuário existe
    const userExistis = await client.user.findFirst({
      where: {
        username,
      }
    })

    if (userExistis) {
      throw new Error("Usuario existente")
    }
    
    // Cadastro do usuario
    // Criptografia da senha
    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    })

    return user;
  }
}

export { CreateUserUseCase }