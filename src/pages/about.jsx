import { CashIcon, CurrencyDollarIcon, FastForwardIcon, TerminalIcon } from '@heroicons/react/solid'
import Link from 'next/link'


const Page = () => {
  return (
    <>
      <div className='container mx-auto md:w-[1024px]'>
        <div className='w-60 md:w-80 h-60 md:h-80 my-4 md:my-8 mx-auto block'>
          <svg id="WXRMP" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.33 425.5"><polygon points="0 283.22 245.66 425.05 245.66 141.38 0 283.22" fill="#ff7096" opacity=".86" /><polygon points="245.66 141.38 245.66 425.05 491.33 283.22 245.66 141.38" fill="#ff5c8a" opacity=".87" /><polygon points="245.66 0 245.66 425.5 491.33 283.67 245.66 0" fill="#ff0a54" opacity=".92" /><polygon points="245.66 0 245.66 425.5 0 283.67 245.66 0" fill="#ff477e" opacity=".88" /></svg>
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
