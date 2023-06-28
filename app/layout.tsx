import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/auth'
import { fetchUserWithSession } from '@/shared/prisma'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tucuna Records',
  description: 'Homologue suas conquistas',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const loggedUser = await fetchUserWithSession(session)

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar loggedUser={loggedUser} />
        {children}
      </body>
    </html>
  )
}
