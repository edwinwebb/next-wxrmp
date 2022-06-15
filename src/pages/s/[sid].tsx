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
      updated: Timestamp.fromDate(new Date()),
      created: Timestamp.fromDate(new Date()),
      author_uid: uid,
      items: scene.items
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
    return (<><div>Loading</div></>)
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

// const PageBak = () => {
//   const router = useRouter()
//   const [isLoading, setLoading] = useState<boolean>(true)
//   const [hasError, setError] = useState<boolean>(false)
//   const [errorMessage, setErrorMessage] = useState<string>('an unspecified error occured')
//   const scene = useStore(state => state.scene)
//   const replaceScene = useStore(state => state.replaceScene)
//   const { sid } = router.query
//   const getScene = async (id: string) => {
//     const docRef = doc(firestore, "scenes", id)
//     const docSnap = await getDoc(docRef)

//     if (docSnap.exists()) {
//       const data = { ...docSnap.data() } as Scene
//       replaceScene(data)
//     } else {
//       setError(true)
//       setErrorMessage('Sorry, we could\'t find that scene.')
//     }

//     setLoading(false)
//   }
//   const [ sceneData, sceneLoading, sceneError ] = useDoucment(
//     doc(firestore, "scenes", id)
//   )


//   const forkScene = async () => {
//     const docRef = await addDoc(collection(firestore, "scenes"), {
//       updated: Timestamp.fromDate(new Date()),
//       created: Timestamp.fromDate(new Date()),
//       author_uid: 'temp',
//       items: scene.items
//     });
//     router.push('/s/' + docRef.id)
//   }
//   const saveScene = async () => {
//     if (sid) {
//       await setDoc(doc(firestore, 'scenes', sid.toString()), {
//         ...scene,
//         author_uid: 'temp',
//         updated: Timestamp.fromDate(new Date()),
//         items: scene.items
//       })
//     } else {
//       setError(true)
//       setErrorMessage('Sorry, we couldn\'t save that scene.')
//     }
//   }

//   // todo better pattern
//   if (hasError) {
//     return (<>
//       <div className='h-full w-full flex justify-center align-center'>
//         <div className="text-center">
//           <h2 className="font-bold text-2xl mt-20">Something Went Wrong</h2>
//           <p className="my-4">{errorMessage}</p>
//           <div>
//             <Link href="/"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Homepage</button></Link>
//             <Link href="/s/new"><button className="bg-pink-600 text-white rounded px-2 py-1 mx-1 text-md">Create New</button></Link>
//           </div>
//         </div>
//       </div>
//     </>)
//   }
//   return (
//     <>
//       <div className='h-full md:flex md:flex-col md:border-r-2 
//        md:border-r-blackpink-800'>
//         <div className='h-18'>
//           <UserControls />
//         </div>
//         { 
//           sceneLoading 
//             ? <SceneControlsLoading />
//             : <SceneControlsGroup saveHandler={ saveScene } forkHandler={ forkScene } /> 
//         }

//       </div>
//       {/* @ts-ignore */}
//       <VREditor r3f
//         saveHandler={() => { saveScene() }}
//       />
//     </>
//   )
// }

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
