import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.js";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository.js";
import { CheckInUseCase } from "./checkin.js";

// const usersRepository = new InMemoryUsersRepository();
// const registerUseCase = new RegisterUseCase(usersRepository);

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
