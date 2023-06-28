'use client'

import Image from 'next/image'
import Logo from '../../public/images/logo.png'
import SignInButton from './SignInButton'

export default function LoginForm() {
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
        <SignInButton provider="google">Continue com o Google</SignInButton>
      </div>
    </div>
  )
}
