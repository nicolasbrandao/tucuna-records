import { authOptions, getOriginPath, makeRedirectURL } from '@/shared/auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import AuthProvider from '../contexts/AuthProvider'

export const metadata = {
  title: 'Tucuna Records App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    const origin = getOriginPath()
    return redirect(makeRedirectURL(origin))
  }

  return <AuthProvider>{children}</AuthProvider>
}
