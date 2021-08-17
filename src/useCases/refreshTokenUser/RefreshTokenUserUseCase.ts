import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs from "dayjs";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

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

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if(refreshTokenExpired) {
      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

      return { token, newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenUserUseCase }