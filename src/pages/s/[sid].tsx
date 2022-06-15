import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import SceneControls from '@/components/dom/Scene/Controls'
import SceneGraph from '@/components/dom/Scene/Graph'
import SceneProperties from '@/components/dom/Scene/Properties'
import { firestore, firebaseApp } from '@/firebase/clientApp';
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from 'react'
import useStore, { Scene } from "@/helpers/store"
import VREditor from '@/components/canvas/Editor'
import UserControls from '@/components/dom/Scene/User'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInAnonymously } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const login = () => {
  signInAnonymously(auth);
};

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
  const [errorMessage, setErrorMessage] = useState<string>('an unspecified error occured')
  const scene = useStore(state => state.scene)
  const replaceScene = useStore(state => state.replaceScene)
  const { sid } = router.query
  const [user, userLoading, userError] = useAuthState(auth);
  const getScene = async (id: string) => {
    const docRef = doc(firestore, "scenes", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = { ...docSnap.data() } as Scene
      replaceScene(data)
    } else {
      setError(true)
      setErrorMessage('Sorry, we could\'t find that scene.')
    }

    setLoading(false)
  }
  const forkScene = async () => {
    const docRef = await addDoc(collection(firestore, "scenes"), {
      updated: Timestamp.fromDate(new Date()),
      created: Timestamp.fromDate(new Date()),
      author_uid: user?.uid,
      items: scene.items
    });
    router.push('/s/' + docRef.id)
  }
  const saveScene = async () => {
    if (sid) {
      await setDoc(doc(firestore, 'scenes', sid.toString()), {
        ...scene,
        author_uid: user?.uid,
        updated: Timestamp.fromDate(new Date()),
        items: scene.items
      })
    } else {
      setError(true)
      setErrorMessage('Sorry, we couldn\'t save that scene.')
    }
  }

  useEffect(() => {
    login()
  })

  useEffect(() => {
    if (sid) {
      getScene(sid.toString())
    } else if (sid === "new") {
      forkScene()
    } else {
      setError(true)
      setErrorMessage('Sorry, the scene ID could not be found')
    }
  }, [sid])

  useEffect(() => {
    if (userError) {
      setError(true)
      setErrorMessage('Unable to manage user')
    }
  }, [userError])

  console.log(user?.uid, scene.author_uid)

  // todo better pattern
  if (hasError) {
    return (<>
      <div className='h-full w-full flex justify-center align-center'>
        <div className="text-center">
          <h2 className="font-bold text-2xl mt-20">Something Went Wrong</h2>
          <p className="my-4">{errorMessage}</p>
          <div>
            <Link href="/"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Homepage</button></Link>
            <Link href="/s/new"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Create New</button></Link>
          </div>
        </div>
      </div>
    </>)
  }
  return (
    <>
      <div className='h-full md:flex md:flex-col md:border-r-2 
       md:border-r-blackpink-800'>
        <div className='h-18'>
          <UserControls userID={user?.uid} loading={userLoading} />
        </div>
        <div className='h-18'>
          <SceneControls
            canSave={user?.uid === scene.author_uid}
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
      <VREditor r3f
        loading={isLoading}
        error={hasError}
        saveHandler={() => { saveScene() }}
        resetHandler={() => {
          if (sid) {
            getScene(sid.toString())
          }
        }
        }
      />
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
