import Link from "next/link"
import Logo from "./Logo"

export default function Menu({ fullwidth }) {
  console.log(fullwidth)
  return (
    <div className={`bg-red-400 h-16 ${fullwidth ? 'md:w-screen' : 'md:w-64'} `}>
      <nav className="flex items-center flex-wrap">
        <Link href="/">
          <a className="inline-flex items-center">
            <span className='mr-2'><Logo /></span>
            <span className="text-xl text-white font-bold uppercase tracking-wide">WXRMP</span>
          </a>
        </Link>
        <button className="inline-flex p-2 hover:bg-pink-400 text-white rounded ml-auto">
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
        <div className="hidden w-full">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

    </div>
  )
}
