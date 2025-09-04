import { Prisma, type User } from "../generated/prisma/client.js"

export interface usersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}