import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";


class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    });

    if(!refreshToken) {
      throw new Error("Refresh token invalido")
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = generateTokenProvider.execute(refreshToken.userId);

    return { token }
  }
}

export { RefreshTokenUserUseCase }