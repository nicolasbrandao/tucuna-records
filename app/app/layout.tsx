import AuthProvider from '../contexts/AuthProvider'

export const metadata = {
  title: 'Tucuna Records App',
  description: 'Aplicação Tucuna Records',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
