import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import SceneControls from '@/components/dom/Scene/Controls'
import SceneGraph from '@/components/dom/Scene/Graph'
import SceneProperties from '@/components/dom/Scene/Properties'
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from 'react'
import useStore, { Scene } from "@/helpers/store"
import VREditor from '@/components/canvas/Editor'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const VREditor = dynamic(() => import('@/components/canvas/Editor'), {
//   ssr: false,
// })

const Page = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [hasError, setError] = useState<boolean>(false)
  const scene = useStore(state => state.scene)
  const replaceScene = useStore(state => state.replaceScene)
  const { sid } = router.query
  const getScene = async (id: string) => {
    const docRef = doc(firestore, "scenes", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = { ...docSnap.data() } as Scene
      replaceScene(data)
    } else {
      setError(true)
    }

    setLoading(false)
  }
  const forkScene = async () => {
    // todo: rate limit
    const docRef = await addDoc(collection(firestore, "scenes"), {
      updated: Timestamp.fromDate(new Date()),
      created: Timestamp.fromDate(new Date()),
      items: scene.items
    });
    router.push('/s/' + docRef.id)
  }
  const saveScene = async () => {
    if (sid) {
      console.log(scene)
      await setDoc(doc(firestore, 'scenes', sid.toString()), {
        ...scene,
        updated: Timestamp.fromDate(new Date()),
        items: scene.items
      })
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (sid) {
      getScene(sid.toString())
    } if (sid === "new") {
      forkScene()
    } else {
      setError(true)
    }
  }, [sid])

  return (
    <>
      <div className='h-full md:flex md:flex-col md:border-r-2 
       md:border-r-blackpink-800'>
        <div className='h-18'>
          <SceneControls
            saveHandler={() => { saveScene() }}
            forkHandler={() => { forkScene() }}
          />
        </div>
        <div className='h-40 md:flex-grow'>
          <SceneGraph />
        </div>
        <div className="h-64">
          <SceneProperties />
        </div>
      </div>
      {/* @ts-ignore */}
      <VREditor r3f loading={isLoading} error={hasError} saveHandler={() => { saveScene() }} />
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
      title: 'WXRMP - Scene Editor',
    },
  }
}
