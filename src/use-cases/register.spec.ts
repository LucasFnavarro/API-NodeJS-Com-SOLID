import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.js";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

// const usersRepository = new InMemoryUsersRepository();
// const registerUseCase = new RegisterUseCase(usersRepository);

let usersRepository = new InMemoryUsersRepository;
let sut = new RegisterUseCase(usersRepository);

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John doe",
      email: "john22@teste.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John doe",
      email,
      password: "123123",
    });

    await expect(() =>
      sut.execute({
        name: "John doe",
        email,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
