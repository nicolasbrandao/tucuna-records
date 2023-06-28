import { headers } from 'next/headers'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions, User } from 'next-auth'
import {
  NO_SESSION_REDIRECT,
  ORIGIN_URL_KEY,
  googleCredentials,
} from './settings'
// FIXME: check if this is actually a problem
// eslint-disable-next-line import/no-cycle
import { createUser } from './prisma'

export type LoginProviders = 'google'

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider(googleCredentials)],
  callbacks: {
    async signIn(user) {
      const loginUser = user.user as User
      createUser(loginUser)
      return true
    },
  },
  pages: {
    signIn: '/login',
  },
}

export function getOriginPath() {
  const headerObj = headers()
  const origin = headerObj.get(ORIGIN_URL_KEY) ?? ''
  return origin
}

export function makeRedirectURL(origin: string) {
  return `${NO_SESSION_REDIRECT}${origin}`
}
