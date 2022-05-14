import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import SceneControls from '@/components/dom/Scene/Controls'
import SceneGraph from '@/components/dom/Scene/Graph'
import SceneProperties from '@/components/dom/Scene/Properties'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const VREditor = dynamic(() => import('@/components/canvas/Editor'), {
  ssr: false,
})

const SceneEditor = () => {
  return (
    <div className='flex flex-col'>
      <SceneControls />
      <SceneGraph />
      <SceneProperties />
    </div>

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
  const router = useRouter()
  const { pid } = router.query
  return (
    <>
      <SceneEditor />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  )
}

export default Page

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'WXRMP - Scene',
    },
  }
}
