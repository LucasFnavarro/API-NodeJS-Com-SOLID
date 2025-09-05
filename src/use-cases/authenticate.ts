import { compare } from "bcryptjs";
import type { usersRepository } from "../repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import type { User } from "../generated/prisma/index.js";

interface AuthenticaeUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticaeUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
