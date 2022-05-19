import useStore from "@/helpers/store"

interface Vector3FormProps {
  onChange: (triplet: [number, number, number]) => void
  vector: [number, number, number]
}

const Vector3Form = (props: Vector3FormProps) => {
  const { onChange, vector } = props
  const [x, y, z] = vector
  const className = "text-xs text-black w-16 p-0 px-1 mr-2 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
  const checkNumber = (v: string): number => {
    const n = parseFloat(v)
    return isNaN(n) ? 0 : n
  }

  return (<div className="mb-1 text-xs">
    <input type="text" className={className} value={x} onChange={v => onChange([checkNumber(v.target.value), y, z])} />
    <input type="text" className={className} value={y} onChange={v => onChange([x, checkNumber(v.target.value), z])} />
    <input type="text" className={className} value={z} onChange={v => onChange([x, y, checkNumber(v.target.value)])} />
  </div>)
}

interface PropertyRowProps {
  label: String,
  children: React.ReactNode
}

const ProperyRow = (props: PropertyRowProps) => {
  const { label, children } = props
  return (<div className="flex flex-row text-xs pb-1">
    <div className="w-16">
      <span>{label}</span>
    </div>
    <div className="w-34">
      {children}
    </div>
  </div>)
}

interface PropertyInputProps {
  value: string
  onChange: (value: string) => void
}

const PropertyInput = (props: PropertyInputProps) => {
  const { value, onChange } = props
  return (<input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    className='
      text-xs
      text-black
      p-0 
      px-1 
      w-52 
      rounded-sm 
      bg-slate-100 
      border-transparent 
      focus:border-gray-500 
      focus:bg-white 
      focus:ring-0'
  />)
}



const Properties = () => {
  const selectedKey = useStore(state => state.selectedItemKey)
  const items = useStore(state => state.scene.items)
  const patchItem = useStore(state => state.patchSceneItem)
  const selectedItem = items[selectedKey]

  // todo - replace with global properties
  if (!selectedItem) return (<div className="bg-blackpink-900 text-white h-36 md:h-52 lg:h-96"></div>)

  return (<div className="bg-blackpink-900 text-white h-36 md:h-52 lg:h-96">
    <ProperyRow label={"Name"}>
      <PropertyInput
        onChange={(v) => patchItem(selectedKey, { ...selectedItem, label: v })}
        value={selectedItem.label}
      />
    </ProperyRow>
    <ProperyRow label={"URL"}>
      <PropertyInput
        onChange={(v) => patchItem(selectedKey, { ...selectedItem, url: v })}
        value={selectedItem.url}
      />
    </ProperyRow>
    <ProperyRow label={"Position"}>
      <Vector3Form vector={selectedItem.position} onChange={(v) => { console.log(v); patchItem(selectedKey, { ...selectedItem, position: v }) }} />
    </ProperyRow>
    <ProperyRow label={"Rotation"}>
      <Vector3Form vector={selectedItem.rotation} onChange={(v) => patchItem(selectedKey, { ...selectedItem, rotation: v })} />
    </ProperyRow>
    <ProperyRow label={"Scale"}>
      <PropertyInput
        onChange={(v) => patchItem(selectedKey, { ...selectedItem, scale: parseFloat(v) })}
        value={selectedItem.scale.toString()}
      />
    </ProperyRow>
  </div>)
}

export default Properties
