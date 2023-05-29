type Credentials = Record<'username' | 'password', string> | undefined

const baseUrl = process.env.NEXTAUTH_URL

export const customCredentials = {
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials: Credentials) {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials?.username,
        password: credentials?.password,
      }),
    })

    const user = await res.json()

    if (user) {
      return user
    }

    return null
  },
}

export const ORIGIN_URL_KEY = 'x-url'
export const NO_SESSION_REDIRECT = '/login?callbackUrl='
