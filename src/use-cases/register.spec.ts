import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.js";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John doe",
      email: "john22@teste.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "John doe",
      email,
      password: "123123",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John doe",
        email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
