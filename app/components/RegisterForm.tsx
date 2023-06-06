'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useReducer } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.png'

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: { confirmPassword: '' },
}

type State = typeof initialState

type Action = {
  type: string
  field: string
  value: string
}

const actionCases = {
  updateField: 'UPDATE_FIELD',
  addError: 'ADD_ERROR',
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionCases.updateField:
      return {
        ...state,
        [action.field]: action.value,
      }
    case actionCases.addError:
      return {
        ...state,
        error: {
          ...state.error,
          [action.field]: action.value,
        },
      }
    default:
      return state
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()

  const handleChange = (field: string, value: string) => {
    dispatch({ type: actionCases.updateField, field, value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (state.password !== state.confirmPassword) {
      return dispatch({
        type: actionCases.addError,
        field: 'confirmPassword',
        value: "Password doesn't match",
      })
    }

    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: state.username,
        email: state.email,
        password: state.password,
      }),
    })

    return router.push('/')
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
          Junte-se à nossa comunidade
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-pale-mint"
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
            <label
              className="block text-sm font-medium leading-6 text-pale-mint"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                id="email"
                name="email"
                type="email"
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
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6 text-pale-mint"
                htmlFor="confirmPassword"
              >
                Confirmar senha
              </label>
            </div>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-navy placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-deep-blue sm:text-sm sm:leading-6"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={(e) => handleChange(e.target.id, e.target.value)}
              />
              {state.error.confirmPassword && (
                <span>{state.error.confirmPassword}</span>
              )}
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center mt-10 rounded-md bg-cerulean px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Criar conta
            </button>
          </div>
        </form>
        <div className="flex gap-2 items-center justify-center mt-10">
          <span className="text-pale-mint">Já possui uma conta?</span>
          <Link href="/login" className="text-cerulean">
            Conecte-se
          </Link>
        </div>
      </div>
    </div>
  )
}
