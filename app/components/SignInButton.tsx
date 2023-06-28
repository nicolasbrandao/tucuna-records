'use client'

import { ReactNode } from 'react'
import { signIn } from 'next-auth/react'
import { LoginProviders } from '@/shared/auth'

type Props = {
  children: ReactNode
  provider: LoginProviders
}

function SignInButton({ children, provider }: Props) {
  return (
    <button
      className="flex w-full justify-center mt-10 rounded-md bg-cerulean px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => signIn(provider)}
      type="button"
    >
      {children}
    </button>
  )
}

export default SignInButton
