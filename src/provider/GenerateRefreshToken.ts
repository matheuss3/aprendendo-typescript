import { client } from "../prisma/client"
import dayjs from "dayjs"


class GenerateRefreshToken {
  async execute(userId: string) {
    await client.refreshToken.deleteMany({
      where: {
        userId
      }
    });

    const expiresIn = dayjs().add(15, 'second').unix();

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken }