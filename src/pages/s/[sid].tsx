import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import SceneControls from '@/components/dom/Scene/Controls'
import SceneGraph from '@/components/dom/Scene/Graph'
import SceneProperties from '@/components/dom/Scene/Properties'
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from 'react'
import useStore from "@/helpers/store"


// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const VREditor = dynamic(() => import('@/components/canvas/Editor'), {
  ssr: false,
})

const Page = () => {
  const router = useRouter()
  const { sid } = router.query
  const [isLoading, setLoading] = useState<boolean>(true)
  const [hasError, setError] = useState<boolean>(false)
  const scene = useStore(state => state.scene)
  const getScene = async (id: string) => {
    const docRef = doc(firestore, "scenes", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log(docSnap.data())
    } else {
      setError(true)
    }

    setLoading(false)
  }
  const forkScene = async () => {
    console.log(scene);
    return
    // todo - change URL
  }
  const saveScene = async () => {
    if (sid) {
      await setDoc(doc(firestore, 'scenes', sid.toString()), {
        updated: Timestamp.fromDate(new Date()),
        scene
      })
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (sid) {
      getScene(sid.toString())
    } else {
      setError(true)
    }
  })

  // console.log(docSnap, pid)
  return (
    <>
      <div className='md:flex md:flex-col md:h-full md:border-r-2 md:border-r-blackpink-800'>
        <SceneControls saveHandler={() => { saveScene() }} forkHandler={() => { forkScene() }} />
        <SceneGraph />
        <SceneProperties />
      </div>
      {/* @ts-ignore */}
      <VREditor r3f loading={isLoading} error={hasError} />
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
