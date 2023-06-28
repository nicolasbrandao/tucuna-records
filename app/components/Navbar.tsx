'use client'

import Image from 'next/image'
import Link from 'next/link'
import { User } from '@prisma/client'
import Logo from '../../public/images/logo.png'
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

type Props = {
  loggedUser: User | null
}

function NavbarContent({ loggedUser }: Props) {
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
      {loggedUser ? (
        <div className="flex items-center gap-2 text-pale-mint">
          <span>{loggedUser.email}</span>
          <div className="flex flex-1 items-center text-pale-mint h-[40px] w-[40px] border-pale-mint rounded-full border-[3px]">
            <Image
              src={loggedUser.image}
              alt={loggedUser.username}
              height={40}
              width={40}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      ) : (
        <Link className="text-pale-mint" href="/login">
          Conectar-se
        </Link>
      )}
    </nav>
  )
}

export default function Navbar({ loggedUser }: Props) {
  return (
    <AuthProvider>
      <NavbarContent loggedUser={loggedUser} />
    </AuthProvider>
  )
}
