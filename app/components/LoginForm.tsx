'use client'

import { signIn } from 'next-auth/react'
import { FormEvent, useReducer } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.png'

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
      <div className=" flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="max-w-[250px] max-h-[250px] flex flex-1">
          <Image
            className="h-full w-full object-cover"
            src={Logo}
            height={500}
            width={500}
            alt="Logo Tucuna Records"
          />
        </div>
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-pale-mint">
          Conectar-se à TUCUNA RECORDS
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              className="block text-sm font-medium leading-6 text-pale-mint"
              htmlFor="username"
            >
              Nome de usuário
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                id="username"
                name="username"
                type="text"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6 text-pale-mint"
                htmlFor="password"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center mt-10 rounded-md bg-cerulean px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
              onClick={handleSubmit}
            >
              Conectar
            </button>
          </div>
        </form>
        <div className="flex gap-2 items-center justify-center mt-10">
          <span className="text-pale-mint">Não possui uma conta?</span>
          <Link href="/registro" className="text-cerulean">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  )
}
