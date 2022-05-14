import Link from "next/link"
import { useState } from "react"
import Logo from "./Logo"

export default function Menu({ fullwidth }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-blackpink-800 h-12">
      <nav className="flex items-center flex-wrap">
        <Link href="/">
          <a className="inline-flex items-center">
            <span className='inline-flex mx-2 my-1'><Logo /></span>
            <h1 className="text-xl font-bold uppercase tracking-wide text-white">WXRMP</h1>
          </a>
        </Link>
        <div className={`hidden md:visible md:inline-flex md:flex-grow md:w-auto`}>
          <div className="flex flex-col md:flex-row md:ml-auto mr-2">
            <Link href="/about">
              <a className="w-full px-3 py-2 text-white/90 hover:bg-pink-200 rounded">About</a>
            </Link>
            <Link href="/contact">
              <a className="w-full px-3 py-2 text-white/90 hover:bg-pink-200 rounded">Contact</a>
            </Link>
            <button className="bg-pink-400 text-white rounded px-2 py-1 mt-1">Create</button>
          </div>
        </div>
      </nav>

    </div>
  )
}
