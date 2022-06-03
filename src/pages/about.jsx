import LOGO from '../../public/img/wxrmp-logo.png'
import Image from 'next/image'
import { CashIcon, CurrencyDollarIcon, FastForwardIcon, TerminalIcon } from '@heroicons/react/solid'


const Page = () => {
  return (
    <>
      <div className='container mx-auto md:w-[1024px]'>
        <div className='w-60 md:w-80 h-60 md:h-80 my-4 md:my-8 mx-auto block'>
          <Image src={LOGO} alt="WXRMP" />
        </div>
        <h2 className='text-center text-4xl font-black mb-4'>WXRMP</h2>
        <h3 className='text-center text-4xl font-thin'>WebXR Media Player</h3>
        <p className='text-md px-2 py-4 text-center font-thin'>
          Experience your media in a new dimension.
          Load in images and videos into an easily controled VR environment.
          Play multiple videos and hundreds of images!
        </p>
        <hr className='m-2 my-4' />
        <div className='grid grid-cols-4'>
          <div className='text-center mx-4'>
            <CashIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Free Forever</h2>
            <p>Load in any media shared publicily on the internet or on your machine</p>
          </div>
          <div className='text-center mx-4'>
            <CurrencyDollarIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Earn some Money</h2>
            <p>Host your media on our platform to charge an access fee</p>
          </div>
          <div className='text-center mx-4'>
            <TerminalIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Accessible</h2>
            <p>Use the site on any heasdset which has a browser</p>
          </div>
          <div className='text-center mx-4'>
            <FastForwardIcon className='w-32 h-32 mx-auto' />
            <h2 className='text-xl font-bold my-2 text-center'>Perfomance</h2>
            <p>Push your devices to the limit. Load in 100s of videos.</p>
          </div>
        </div>
        <hr className='m-2 my-4' />

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
