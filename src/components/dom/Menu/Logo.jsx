import LogoImg from '../../../../public/img/wxrmp-logo.png'
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => (
  // <Link href="/">
  <Image src={LogoImg} alt="WXRMP" height={36} width={36} />
  // </Link>
)

export default Logo
