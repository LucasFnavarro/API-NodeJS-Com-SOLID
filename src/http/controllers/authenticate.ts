import z from "zod";

import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error.js";
import { AuthenticateUseCase } from "../../use-cases/authenticate.js";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send({
    message: "User created successfully",
  });
}
