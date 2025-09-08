import z from "zod";

import type { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error.js";
import { makeRegisterUseCase } from "../../use-cases/factories/make-register-use-case.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      message: "User created successfully",
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send(err.message);
    }

    return reply.status(500).send();
  }
}
