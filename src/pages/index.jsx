import dynamic from 'next/dynamic'
import Menu from '@/components/dom/Menu/Menu'
import FlatEditor from '@/components/dom/SceneEditor'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const VREditor = dynamic(() => import('@/components/canvas/Editor'), {
  ssr: false,
})

const JSONEditor = () => {
  return (
    <FlatEditor />
  )
}

// canvas components goes here
const R3F = () => {
  return (
    <>
      <VREditor />
    </>
  )
}

const Page = () => {
  return (
    <>
      <Menu />
      <JSONEditor />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
