import LOGO from '../../public/img/wxrmp-logo.png'
import Image from 'next/image'
import { CashIcon, CurrencyDollarIcon, FastForwardIcon, TerminalIcon } from '@heroicons/react/solid'
import Link from 'next/link'


const Page = () => {
  return (
    <>
      <div className='container mx-auto md:w-[1024px]'>
        <div className='w-60 md:w-80 h-60 md:h-80 my-4 md:my-8 mx-auto block'>
          <Image src={LOGO} alt="WXRMP" />
        </div>
        <h2 className='text-center text-4xl w-96 mx-auto mb-8 font-bold'>Your media in VR</h2>
        <div className="text-center">
          <Link href="/s/new"><button className="bg-pink-600 text-xl text-white font-bold rounded px-4 py-2">Open App</button></Link>
        </div>
        <hr className='m-2 my-8' />
        <h3 className='text-center text-4xl font-thin'>WebXR Media Player</h3>
        <p className='text-md px-2 py-4 text-center font-thin'>
          Experience your media in a new dimension.
          Load in images and videos into an easily controled VR environment.
          Play multiple videos and hundreds of images!
        </p>
        <div className='grid grid-cols-1 md:grid-cols-4'>
          <div className='text-center mx-4 mt-2 md:mt-0'>
            <CashIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Free Forever</h2>
            <p>Load in any media shared publicily on the internet or on your machine</p>
          </div>
          <div className='text-center mx-4 mt-2 md:mt-0'>
            <CurrencyDollarIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Earn some Money</h2>
            <p>Host your media on our platform to charge an access fee</p>
          </div>
          <div className='text-center mx-4 mt-2 md:mt-0'>
            <TerminalIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Accessible</h2>
            <p>Use the site on any heasdset which has a browser</p>
          </div>
          <div className='text-center mx-4 mt-2 md:mt-0'>
            <FastForwardIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Perfomance</h2>
            <p>Push your devices to the limit. Load in 100s of videos.</p>
          </div>
        </div>
        <hr className='m-2 my-4' />
        <h2>Coming Soon</h2>
        <h3>GLTF</h3>
        <p>Load in GLTF models</p>
        <h3>Audio</h3>
        <p></p>
        <hr />
        <p>TODO: Copy spline a little more. Need a good image/video demo for the hero. Expand the 4 grid to pages.</p>
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
