import Image from 'next/image'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Logo from '../../public/logo.png'

const navList = [
  {
    id: 'home',
    title: 'Início',
  },
]

function NavbarList() {
  return (
    <ul className="flex items-center">
      {navList.map((item) => (
        <li className="text-pale-mint" key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  )
}

export default function Navbar() {
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
      <div className="text-pale-mint h-[40px] w-[40px]">
        <Bars3Icon />
      </div>
    </nav>
  )
}
