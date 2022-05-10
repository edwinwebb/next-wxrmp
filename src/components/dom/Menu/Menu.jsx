import Link from "next/link"
import { useState } from "react"
import Logo from "./Logo"

export default function Menu({ fullwidth }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-pink-300">
      <nav className="flex items-center flex-wrap">
        <Link href="/">
          <a className="inline-flex items-center">
            <span className='inline-flex mx-2 my-1'><Logo /></span>
            <span className="text-xl text-white font-bold uppercase tracking-wide">WXRMP</span>
          </a>
        </Link>
        <button onClick={() => { setOpen(!open) }} className="inline-flex p-2 hover:bg-pink-400 text-white rounded ml-auto mr-2 md:hidden">
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div className={`${open ? '' : 'hidden'} w-full md:visible md:inline-flex md:flex-grow md:w-auto`}>
          <div className="flex flex-col md:flex-row md:ml-auto mr-2">
            <Link href="/about">
              <a className="w-full px-3 py-2 text-white hover:bg-pink-200 rounded">About</a>
            </Link>
            <Link href="/contact">
              <a className="w-full px-3 py-2 text-white hover:bg-pink-200 rounded">Contact</a>
            </Link>
          </div>
        </div>
      </nav>

    </div>
  )
}
