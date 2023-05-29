type Credentials = Record<'username' | 'password', string> | undefined

export const customCredentials = {
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials: Credentials) {
    const res = await fetch('http://localhost:3000/api/login', {
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
