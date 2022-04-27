import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import '@/styles/index.css'
import dynamic from 'next/dynamic'

// https://nextjs.org/docs/advanced-features/custom-app

// dynamically load canvas
const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

// Split components into DOM or R3F by prop flags
const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)

  console.log(r3f)

  return (
    <>
      <Dom>{dom}</Dom>
      {r3f.length > 0 && <LCanvas>{r3f}</LCanvas>}
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
