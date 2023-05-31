'use client'

import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from '../../public/logo.png'
import AuthProvider from '../contexts/AuthProvider'

const navList = [
  {
    id: 'home',
    title: 'Início',
    to: '/',
  },
  {
    id: 'records',
    title: 'Recordes',
    to: '/app/recordes',
  },
]

function NavbarList() {
  return (
    <ul className="flex items-center gap-4">
      {navList.map((item) => (
        <li className="text-pale-mint" key={item.id}>
          <Link href={item.to}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

function NavbarContent() {
  const session = useSession()

  return (
    <nav className="h-[60px] absolute w-full p-2 flex gap-4 justify-between items-center bg-dark-blue">
      <div className="flex gap-4">
        <div className="max-w-[50px] max-h-[50px] flex flex-1">
          <Image
            className="h-full w-full object-cover"
            src={Logo}
            height={50}
            width={50}
            alt="Logo Tucuna Records"
          />
        </div>
        <NavbarList />
      </div>
      {session ? (
        <div className="flex items-center gap-2 text-pale-mint">
          <span>{session.data?.user.username}</span>
          <div className="flex items-center text-pale-mint h-[40px] w-[40px]">
            <UserCircleIcon />
          </div>
        </div>
      ) : (
        <span>Conectar-se</span>
      )}
    </nav>
  )
}

export default function Navbar() {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  )
}
