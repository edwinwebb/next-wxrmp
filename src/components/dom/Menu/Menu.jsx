import Link from "next/link"

export default function Menu() {
  return (
    <nav className="bg-blackpink-800 h-11 flex flex-row w-screen items-center justify-between">
      <div>
        <Link href="/">
          <a className="flex flex-row justify-center items-center h-11 pl-2">
            <svg id="WXRMP" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.33 425.5"><polygon points="0 283.22 245.66 425.05 245.66 141.38 0 283.22" fill="#ff7096" opacity=".86" /><polygon points="245.66 141.38 245.66 425.05 491.33 283.22 245.66 141.38" fill="#ff5c8a" opacity=".87" /><polygon points="245.66 0 245.66 425.5 491.33 283.67 245.66 0" fill="#ff0a54" opacity=".92" /><polygon points="245.66 0 245.66 425.5 0 283.67 245.66 0" fill="#ff477e" opacity=".88" /></svg>
            <h1 className="pl-2 inline align-text-top text-xl font-bold uppercase tracking-wide text-white">WXRMP</h1>
          </a>
        </Link>
      </div>
      <div className="pr-2">
        {/* <Link href="/about">
          <a className="hidden md:inline px-2 py-1 mr-2 text-white/90 hover:bg-pink-200 rounded">About</a>
        </Link>
        <Link href="/contact">
          <a className="hidden md:inline px-2 py-1 mr-2 text-white/90 hover:bg-pink-200 rounded">Contact</a>
        </Link> */}
        <Link href="/s/new"><button className="bg-pink-600 text-white rounded px-2 py-1">Create</button></Link>
      </div>
    </nav>
  )
}
