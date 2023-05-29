import { headers } from 'next/headers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import {
  NO_SESSION_REDIRECT,
  ORIGIN_URL_KEY,
  customCredentials,
} from './settings'

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider(customCredentials)],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // FIXME: check if this type assertion is the only way to do this
      // eslint-disable-next-line no-param-reassign
      session.user = token as any
      return session
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
