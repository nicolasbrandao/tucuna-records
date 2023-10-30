import { User as NextUser, Session } from 'next-auth'
import { Prisma } from '@prisma/client'
import prisma from './client'

class UserDAO {
  private static parseNextAuthUser(
    loginUser: NextUser,
  ): Prisma.UserCreateInput {
    return {
      username: loginUser.email ?? '',
      name: loginUser.name ?? '',
      email: loginUser.email ?? '',
      image: loginUser.image ?? undefined,
    }
  }

  static async fetchUserBy(where: Prisma.UserWhereUniqueInput) {
    if (where.username) {
      // FIXME: check if this is actually a problem
      // eslint-disable-next-line no-param-reassign
      where.username = decodeURIComponent(where.username)
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await prisma.user.findUnique({ where })
  }

  static async createUser(loginUser: NextUser) {
    const existingUser = await this.fetchUserBy({
      email: loginUser.email!,
    })

    if (existingUser) return existingUser

    return prisma.user.create({
      data: this.parseNextAuthUser(loginUser),
    })
  }

  static async fetchUserWithSession(session: Session | null) {
    if (session?.user?.email) {
      const loggedUser = await this.fetchUserBy({ email: session.user.email })
      if (loggedUser) {
        return loggedUser
      }
    }

    return null
  }
}

export default UserDAO
