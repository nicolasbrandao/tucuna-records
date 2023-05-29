'use client'

import { signOut } from 'next-auth/react'

export default function Home() {
  return (
    <main className="bg-midnight-blue h-full">
      <p className="text-cerulean">APP TUCUNA RECORDS</p>
      <button type="button" onClick={() => signOut()}>
        SIGN OUT
      </button>
    </main>
  )
}
