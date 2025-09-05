import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { AuthenticateUseCase } from "./authenticate.js";
import { hash } from "bcryptjs";

// const usersRepository = new InMemoryUsersRepository();
// const sut = new AuthenticateUseCase(usersRepository);

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123123", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123123", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
