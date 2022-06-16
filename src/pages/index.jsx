import Link from 'next/link'
import Image from 'next/image'
import LOGO from '../../public/img/wxrmp-logo.png'
import { BriefcaseIcon, MailIcon, PhotographIcon, SearchIcon } from '@heroicons/react/solid'

// interface FeatureBlockProps {
//   children: ReactElement[];
//   header: string;
//   sub: string;
// }

const FeatureBlock = ({ children, header, sub }) => {
  return (<div className='rounded-lg bg-stone-900 m-4 p-6 py-8 text-center'>
    <div className='rounded-lg p-4 mb-8 text-center bg-stone-800 inline-block'>
      {children}
    </div>
    <h3 className='text-stone-100 my-1 mx-4 text-lg font-bold'>{header}</h3>
    <p className='text-stone-200 my-1 mx-4'>{sub}</p>
  </div>)
}

const Page = () => {
  return (<>
    <div className='container mx-auto md:w-[1024px]'>
      <div className='w-60 md:w-80 h-60 md:h-80 my-4 md:my-8 mx-auto block'>
        <Image src={LOGO} alt="WXRMP" />
      </div>
      <h2 className='text-center text-4xl w-96 mx-auto mb-8 font-bold'>Your media in VR</h2>
      <div className="text-center">
        <Link href="/s/new"><button className="bg-pink-600 text-xl text-white font-bold rounded px-4 py-2">Open App</button></Link>
      </div>
      <div className='rounded-lg bg-blackpink-800 py-8 px-4 m-4'>
        <h3 className='text-center text-4xl font-thin'>WebXR Media Player</h3>
        <p className='text-md py-4 text-center font-thin'>
          Experience your media in a new dimension.<br />
          Load in images and videos into an browser VR environment.<br />
          Play multiple videos and hundreds of images!<br />
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <FeatureBlock header="Custom Scene" sub="Build, save and share your media in VR">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
        <FeatureBlock header="Images" sub="Load in hundreds images into your scene">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
        <FeatureBlock header="Videos" sub="Play multiple videos in VR">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
        <FeatureBlock header="Browser Technology" sub="VR in your browser. No downloads!">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
        <FeatureBlock header="Works on Occulus" sub="You don't need a high end headset">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
        <FeatureBlock header="Mobile too" sub="Prep scenes on your other devices">
          <PhotographIcon className='w-8 h-8 text-stone-400' />
        </FeatureBlock>
      </div>
      <h2 className='text-center text-xl text-stone-100 mt-12 font-bold'>We're just getting started</h2>
      <p className='text-center py-2 text-stone-300'>Please reach out to get help or just to connect. Maybe you found a bug or have an idea. If you think you can contribute then please get in touch! </p>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <FeatureBlock header="Email Us" sub="hello@wxrmp.com">
          <MailIcon className='w-8 h-8 text-red-400' />
        </FeatureBlock>
        <FeatureBlock header="Bugs" sub="bugs@wxrmp.com">
          <SearchIcon className='w-8 h-8 text-green-400' />
        </FeatureBlock>
        <FeatureBlock header="Jobs" sub="jobs@wxrmp.com">
          <BriefcaseIcon className='w-8 h-8 text-blue-400' />
        </FeatureBlock>
        <FeatureBlock header="Twitter" sub="@wxrmp">
          <svg
            class="w-6 h-6 text-blue-400 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>
        </FeatureBlock>
        <FeatureBlock header="TikTok" sub="Play multiple videos in VR">
          <svg
            class="w-6 h-6 text-cyan-400 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.7,0H2.3C1,0,0,1,0,2.2v19.5C0,23,1,24,2.3,24h19.5c1.2,0,2.3-1,2.3-2.2V2.2C24,1,23,0,21.7,0z M14.9,4.5 c0.3,2.1,1.4,3.4,3.5,3.5v2.4c-1.2,0.1-2.3-0.3-3.5-1v4.5c0,5.7-6.2,7.5-8.7,3.4c-1.6-2.6-0.6-7.2,4.5-7.4v2.5 c-0.4,0.1-0.8,0.2-1.2,0.3c-1.1,0.4-1.8,1.1-1.6,2.4c0.3,2.5,4.9,3.2,4.5-1.6v-9L14.9,4.5L14.9,4.5z" />
          </svg>
        </FeatureBlock>
        <FeatureBlock header="Reddit" sub="/r/wxrmp">
          <svg
            class="w-6 h-6 text-orange-400 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
            />
          </svg>
        </FeatureBlock>
      </div>
    </div>
  </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'WXRMP - Homepage',
    },
  }
}
