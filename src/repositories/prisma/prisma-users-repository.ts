import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { usersRepository } from "../users-repository.js";

export class PrismaUsersRepository implements usersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
