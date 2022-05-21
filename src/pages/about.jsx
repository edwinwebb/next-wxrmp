import LOGO from '../../public/img/wxrmp-logo.png'
import Image from 'next/image'


const Page = () => {
  return (
    <>
      <div>
        <h2><Image src={LOGO} alt="WXRMP" height={36} width={36} /> WXRMP</h2>
        <h3>Web XR Media Player</h3>
        <h4>Experience your media in a new dimension</h4>
      </div>
      <div>
        <h2>Free Forever</h2>
        <p>Load in any media shared publicily on the internet</p>
        <h2>Earn some coin</h2>
        <p>Charge a fee to share your media on our platform</p>
        <h2>Privacy First</h2>
        <p>We won't share your media without your consent</p>
        <p></p>
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'About',
    },
  }
}
