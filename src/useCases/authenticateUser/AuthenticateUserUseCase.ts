import { client } from "../../prisma/client"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

interface IRequest {
  username: string,
  password: string
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se o usuario existe
    const usuario = await client.user.findFirst({
      where:{
        username,
      }
    });
    // Usuário não existe
    if (!usuario) {
      throw new Error("Senha ou usuário inválidos")
    }

    // Verificar senha
    const passwordMatch = await compare(password, usuario.password) 
    
    if (!passwordMatch) {
      throw new Error("Senha ou usuário inválidos")
    }

    // Gerar token de acesso
    const generateTokenProvider = new GenerateTokenProvider();
    const token = generateTokenProvider.execute(usuario.id)

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(usuario.id);



    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };