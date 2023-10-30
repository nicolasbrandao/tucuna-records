import { PropsWithChildren } from 'react'
import AuthProvider from './AuthProvider'

function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>
}

export default Providers
