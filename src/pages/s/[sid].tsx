import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import SceneControls from '@/components/dom/Scene/Controls'
import SceneGraph from '@/components/dom/Scene/Graph'
import SceneProperties from '@/components/dom/Scene/Properties'
import { firestore, firebaseApp } from '@/firebase/clientApp';
import { doc, setDoc, addDoc, collection, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from 'react'
import useStore, { Scene } from "@/helpers/store"
import VREditor from '@/components/canvas/Editor'
import UserControls from '@/components/dom/Scene/User'
import Link from 'next/link'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const VREditor = dynamic(() => import('@/components/canvas/Editor'), {
//   ssr: false,
// })

const auth = getAuth(firebaseApp);

const login = () => {
  signInAnonymously(auth);
};

interface SceneControlGroupProps {
  saveHandler: () => void;
  forkHandler: () => void;
}

const SceneControlsGroup = ({ saveHandler, forkHandler }: SceneControlGroupProps) => {
  return (<>
    <div className='h-18'>
      <SceneControls saveHandler={saveHandler} forkHandler={forkHandler} />
    </div>
    <div className='h-40 md:flex-grow'>
      <SceneGraph />
    </div>
    <div className="h-64">
      <SceneProperties />
    </div>
  </>)
}

const SceneControlsLoading = () => (
  <>
    <div className='h-18'>
      <div className='rounded w-full h-14 bg-blackpink-800' />
    </div>
    <div className='h-40 md:flex-grow'>
      <div className='rounded w-full h-32 bg-blackpink-800' />
    </div>
    <div className="h-64">
      <div className='rounded w-full h-32 bg-blackpink-800' />
    </div>
  </>)

const ErrorPage = () => (
  <>
    <div className='h-full w-full flex justify-center align-center'>
      <div className="text-center">
        <h2 className="font-bold text-2xl mt-20">Something Went Wrong</h2>
        <p className="my-4">{'errorMessage'}</p>
        <div>
          <Link href="/"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Homepage</button></Link>
          <Link href="/s/new"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Create New</button></Link>
        </div>
      </div>
    </div>
  </>
)

const Spinner = () => (<svg role="status" className="w-8 h-8 mr-2 text-pink-800 animate-spin dark:text-pink-900 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
</svg>)

const Page = () => {
  const router = useRouter()
  const { sid } = router.query
  const [uid, authed] = useStore(s => [s.user_uid, s.authorised])
  const [canLoad, setCanLoad] = useState(false)
  const scene = useStore(state => state.scene)
  const [user, loading, error] = useAuthState(auth)
  const updateUser = useStore(s => s.updateUserState)
  const forkScene = async () => {
    const docRef = await addDoc(collection(firestore, "scenes"), {
      ...scene,
      updated: Timestamp.fromDate(new Date()),
      created: Timestamp.fromDate(new Date()),
      author_uid: uid
    });
    router.push('/s/' + docRef.id)
  }
  const saveScene = async () => {
    if (sid) {
      await setDoc(doc(firestore, 'scenes', sid.toString()), {
        ...scene,
        author_uid: uid,
        updated: Timestamp.fromDate(new Date()),
        items: scene.items
      })
    } else {
      console.error('error saving')
    }
  }

  useEffect(() => {
    login()
  })

  useEffect(() => {
    if (!loading && !error && user?.uid) {
      updateUser(user.uid, true)
    } else {
      updateUser('', false)
    }
  }, [loading, error])

  useEffect(() => {
    if (sid && sid.toString() === 'new' && authed) {
      forkScene()
    } else if (authed) {
      setCanLoad(true)
    } else {
      console.error('Page effect error', sid, authed)
    }
  }, [sid, authed])

  if (!canLoad || !sid) {
    return (<><div className='pt-48 w-full flex justify-center content-center'><Spinner /></div></>)
  }

  return (<>
    <Editor
      sid={sid.toString()}
      uid={uid}
      saveHandler={saveScene}
      forkHandler={forkScene}
    />
    {/* @ts-ignore */}
    <VREditor r3f
      saveHandler={saveScene}
    />
  </>)

}

interface EditorProps {
  sid: string;
  uid: string;
  saveHandler: () => void;
  forkHandler: () => void;
}

const Editor = ({ sid, saveHandler, forkHandler, uid }: EditorProps) => {
  const [sceneData, sceneLoading, sceneError] = useDocumentData(doc(firestore, "scenes", sid))
  const replaceScene = useStore(state => state.replaceScene)

  useEffect(() => {
    replaceScene({ ...sceneData } as Scene)
  }, [sceneLoading, sceneError, sceneData])

  return (<>
    <div className='h-full md:flex md:flex-col md:border-r-2 
       md:border-r-blackpink-800'>
      <div className='h-18'>
        <UserControls uid={uid} loading={sceneLoading} />
      </div>
      {
        sceneLoading
          ? <SceneControlsLoading />
          : <SceneControlsGroup saveHandler={saveHandler} forkHandler={forkHandler} />
      }
    </div>
  </>)
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
