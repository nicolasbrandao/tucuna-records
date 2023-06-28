import { PrismaClient, Prisma } from '@prisma/client'
import { User as NextUser, Session } from 'next-auth'

const prisma = new PrismaClient()

export default prisma

function parseNextAuthUser(loginUser: NextUser): Prisma.UserCreateInput {
  return {
    username: loginUser.email ?? '',
    name: loginUser.name ?? '',
    email: loginUser.email ?? '',
    image: loginUser.image ?? undefined,
  }
}

export async function fetchUserBy(where: Prisma.UserWhereUniqueInput) {
  if (where.username) {
    // FIXME: check if this is actually a problem
    // eslint-disable-next-line no-param-reassign
    where.username = decodeURIComponent(where.username)
  }

  // eslint-disable-next-line @typescript-eslint/return-await
  return await prisma.user.findUnique({ where })
}

export async function createUser(loginUser: NextUser) {
  const existingUser = await fetchUserBy({
    email: loginUser.email!,
  })

  if (existingUser) return existingUser

  return prisma.user.create({
    data: parseNextAuthUser(loginUser),
  })
}

export async function fetchUserWithSession(session: Session | null) {
  if (session?.user?.email) {
    const loggedUser = await fetchUserBy({ email: session.user.email })
    if (loggedUser) {
      return loggedUser
    }
  }

  return null
}
