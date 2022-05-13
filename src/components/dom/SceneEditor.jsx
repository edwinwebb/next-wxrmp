import useStore from "@/helpers/store"

const Vector3Form = (props) => {
  const { label, vector } = props
  const [x, y, z] = vector
  const className = "text-xs w-16 p-0 px-1 mr-2 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"

  return (<div className="mb-1 text-xs">
    <span className="w-8 inline-block">{label}</span>
    <input type="text" className={className} value={x} />
    <input type="text" className={className} value={y} />
    <input type="text" className={className} value={z} />
  </div>)
}

const NumberInput = (props) => {
  const { label, value, onChange } = props
  return (<span><label>X:</label><input type="number" value={x} /></span>)
}

const SceneItem = (props) => {
  const { url, scale, position, rotation } = props
  return (<li className="flex flex-row border-b-2 bg-gray-200 border-slate-300 pb-1">
    <div className="w-12 p-2">
      <img className="object-cover" src={url} />
    </div>
    <div className="flex-1 text-xs pt-1">
      <div className="mb-1">
        <span className="w-8 inline-block">🕸️</span>
        <input type="text" value={url} className='text-xs p-0 px-1 w-52 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' />
      </div>
      <Vector3Form vector={position} label="🧘🏽" />
      <Vector3Form vector={rotation} label="🫠" />
      <div className="flex flex-row mb-1">
        <div className="w-24 mr-2">
          <span className="w-8 inline-block">⚖️</span>
          <input type="text" value={scale} className='text-xs p-0 px-1 w-16 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0' />
        </div>
        <div className="w-16 mr-2">
          <button>❌ remove</button>
        </div>
        <div className="w-16">
          <button>🕐 reset</button>
        </div>
      </div>

    </div>
  </li>)
}

export default function SceneEditor() {
  const scene = useStore(store => store.scene)
  return (
    <div className="h-96">
      <h2>Scene ID</h2>
      <ul>
        {scene.map((item, v) => <SceneItem {...item} />)}
      </ul>
    </div>
  )
}
