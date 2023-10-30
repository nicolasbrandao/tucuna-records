import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './contexts/Providers'

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
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
