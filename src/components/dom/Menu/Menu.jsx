import Link from "next/link"
import LogoImg from '../../../../public/img/wxrmp-logo.png'
import Image from 'next/image'

export default function Menu() {
  return (
    <nav className="bg-blackpink-800 h-11 flex flex-row w-screen items-center justify-between">
      <div>
        <Link href="/">
          <a className="flex flex-row justify-center items-center h-11 pl-2">
            <Image src={LogoImg} alt="WXRMP" height={36} width={36} />
            <h1 className="pl-2 inline align-text-top text-xl font-bold uppercase tracking-wide text-white">WXRMP</h1>
          </a>
        </Link>
      </div>
      <div className="pr-2">
        <Link href="/about">
          <a className="hidden md:inline px-2 py-1 mr-2 text-white/90 hover:bg-pink-200 rounded">About</a>
        </Link>
        <Link href="/contact">
          <a className="hidden md:inline px-2 py-1 mr-2 text-white/90 hover:bg-pink-200 rounded">Contact</a>
        </Link>
        <Link href="/s/new"><button className="bg-pink-600 text-white rounded px-2 py-1">Create</button></Link>
      </div>
    </nav>
  )
}
