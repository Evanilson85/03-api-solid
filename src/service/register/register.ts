import { PrismaUserRepository } from './../../repositories/prisma-user-repositories';
import { hash } from 'bcryptjs';
import { prisma } from './../../lib/prisma';

interface Params {
  name: string
  email: string
  password: string
}

export async function registerService ({ email, name, password }: Params) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(userWithSameEmail) {
    throw new Error('email já existe')
  }

  const password_hash = await hash(password, 6)

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    email,
    name,
    password_hash
  })
}