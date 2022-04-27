import LogoImg from '../../../../public/img/wxrmp-logo.png'
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => (
  // <Link href="/">
  <Image src={LogoImg} alt="WXRMP" height={56} width={56} />
  // </Link>
)

export default Logo
