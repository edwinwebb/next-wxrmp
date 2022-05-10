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

  return (
    <>
      {/* <Menu /> */}
      {/*<div>
        <Dom>{dom}</Dom>
        {r3f.length > 0 && <LCanvas>{r3f}</LCanvas>}
      </div> */}
      <div className='bg-red-100 flex flex-col flex-wrap h-screen'>
        <div className='bg-yellow-100 h-12'>menu</div>
        <div className='bg-green-100 h-96'>dom</div>
        {r3f.length > 0 && <div className='bg-blue-100 flex-1'>c</div>}
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
