import { sign } from "jsonwebtoken";


class GenerateTokenProvider {

  execute(userId: string) {
    const token = sign({}, "68c26937-686c-4b19-87a8-793464f567c0", {
      subject: userId,
      expiresIn: "20s"
    });

    return token;
  }

}

export { GenerateTokenProvider };