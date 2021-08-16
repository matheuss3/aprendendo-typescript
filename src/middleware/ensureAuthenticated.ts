import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;


  if (!authToken) {
    response.status(401).json({ mensage: "Token invalido!" });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "68c26937-686c-4b19-87a8-793464f567c0");
    return next();
  } catch {
    response.status(401).json({ mensage: "Token invalido!" });
  }
}