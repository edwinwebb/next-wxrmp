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
      <div className={`bg-blackpink-900 text-white ${hasCanvas ? 'canvas' : 'nocanvas'}`} id="mainLayout">
        <div id="menu"><Menu /></div>
        <div id="dom">
          <Dom>{dom}</Dom>
        </div>
        {hasCanvas && <div id="r3f"><LCanvas>{r3f}</LCanvas></div>}
      </div>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const child = Component(pageProps).props.children

  return (
    <>
      <Header title={pageProps.title} />
      <Balance child={child} />
    </>
  )
}

export default App
