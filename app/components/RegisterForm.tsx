'use client'

import { FormEvent, useReducer } from 'react'

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

type State = typeof initialState

type Action = {
  type: string
  field: string
  value: string
}

const actionCases = {
  updateField: 'UPDATE_FIELD',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionCases.updateField:
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (field: string, value: string) => {
    dispatch({ type: actionCases.updateField, field, value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (state.password !== state.confirmPassword) {
      return new Error("Password doesn't match")
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: state.username,
        email: state.email,
      }),
    })

    return res.json()
  }

  return (
    <div className="flex h-full my-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto w-fit text-4xl font-bold text-pale-mint">
          {/* FIXME: insert app logo here */}
          TUCUNA RECORDS
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-pale-mint">
          Junte-se à nossa comunidade
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-pale-mint"
            >
              Nome de usuário
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-pale-mint"
            >
              E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-pale-mint"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-pale-mint"
              >
                Confirmar senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center mt-20 rounded-md bg-cerulean px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
