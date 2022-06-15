import useStore from '@/helpers/store'
import { UploadIcon, DuplicateIcon, PlusSmIcon, PhotographIcon, FilmIcon } from '@heroicons/react/solid'

interface ControlButtonProps {
  children: React.ReactNode
  onClick: () => void
}

const ControlButton = (props: ControlButtonProps) => {
  const { children, onClick } = props
  return (<button className="text-sm rounded border-blackpink-800 mr-2 px-2 border-2 box-border hover:border-blackpink-300 hover:bg-blackpink-500 " onClick={() => { onClick() }}>
    {children}
  </button>)
}

const LoadingButton = () => {
  return <span className='rounded border-blackpink-800 mr-2 px-2 border-2 box-border '>
    ...
  </span>
}

interface SceneControlProps {
  saveHandler: () => void;
  forkHandler: () => void;
}

const Controls = ({ saveHandler, forkHandler }: SceneControlProps) => {
  const addSceneItem = useStore(state => state.addSceneItem)
  const scene_uid = useStore(s => s.scene.author_uid)
  const [uid, authed] = useStore(s => [s.user_uid, s.authorised])

  return (<div className="bg-blackpink-900 text-white h-18 py-2 border-blackpink-800 border-b-2">
    {
      !authed
        ? <div>
          <LoadingButton />
          <LoadingButton />
          <LoadingButton />
          <LoadingButton />
        </div>
        : <div>
          {uid === scene_uid
            && <ControlButton onClick={() => { saveHandler() }}>
              <UploadIcon className='h-3 w-3 inline mr-1' />
              <span className="text-xs">Save</span>
            </ControlButton>
          }
          <ControlButton onClick={() => { forkHandler() }} >
            <DuplicateIcon className='h-3 w-3 inline mr-1' />
            <span className="text-xs">Fork</span>
          </ControlButton>
          <ControlButton onClick={() => addSceneItem('image', 'image 1', [0, 1, -1 - Math.random()], [0, 0, 0], '404')} >
            <PlusSmIcon className='h-3 w-3 inline mr-1' />
            <PhotographIcon className='h-3 w-3 inline mr-1' />
          </ControlButton>
          <ControlButton onClick={() => addSceneItem('video', 'video 1', [0, 1, -1 - Math.random()], [0, 0, 0], '404')} >
            <PlusSmIcon className='h-3 w-3 inline mr-1' />
            <FilmIcon className='h-3 w-3 inline mr-1' />
          </ControlButton>
        </div>
    }
  </div>)
}

export default Controls
