'use client'

import { signIn } from 'next-auth/react'
import { FormEvent, useReducer } from 'react'

const initialState = {
  username: '',
  password: '',
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

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (field: string, value: string) => {
    dispatch({ type: actionCases.updateField, field, value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await signIn('credentials', {
      username: state.username,
      password: state.password,
      redirect: true,
      callbackUrl: '/app',
    })
  }

  return (
    <div className="flex h-full my-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto w-fit text-4xl font-bold text-pale-mint">
          {/* FIXME: insert app logo here */}
          TUCUNA RECORDS
        </h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-pale-mint">
          Conectar-se à TUCUNA RECORDS
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
            <button
              type="submit"
              className="flex w-full justify-center mt-10 rounded-md bg-cerulean px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Conectar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
