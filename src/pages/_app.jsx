import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import Menu from '@/components/dom/Menu/Menu'

// https://nextjs.org/docs/advanced-features/custom-app

// dynamically load canvas
const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

// Split components into DOM or R3F by prop flags
const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)
  const hasCanvas = r3f.length > 0

  return (
    <>
      {/* <Menu /> */}
      {/*<div>
        <Dom>{dom}</Dom>
        {r3f.length > 0 && <LCanvas>{r3f}</LCanvas>}
      </div> */}
      <div className='flex flex-col flex-wrap h-screen md:flex-row'>
        <div className='h-12 w-screen'><Menu /></div>
        <div className={`h-96 overflow-scroll md:h-full ${hasCanvas ? 'md:w-80' : 'md:w-full'}`}><Dom>{dom}</Dom></div>
        {hasCanvas && <div className='flex-1'><LCanvas>{r3f}</LCanvas></div>}
      </div>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header title={pageProps.title} />
      <Balance child={child} />
    </>
  )
}

export default App
