import useStore from "@/helpers/store"
import GlobalProperies from './Globals'

interface Vector3FormProps {
  onChange: (triplet: [number, number, number]) => void
  vector: [number, number, number]
}

const checkNumber = (v: string): number => {
  const n = parseFloat(v)
  return isNaN(n) ? 0 : n
}

// this has to be an antipattern
const inputClassName = "text-xs text-white w-16 p-0 px-1 py-1 mr-2 rounded-sm bg-slate-700 border-transparent focus:border-gray-900 focus:bg-slate-800"

const Vector3Form = (props: Vector3FormProps) => {
  const { onChange, vector } = props
  const [x, y, z] = vector

  return (<div className="mb-1 text-xs">
    <span className="relative before:content-['X'] before:ml-0.5 before:text-green-600 before:absolute before:left-1 before:py-1 before:align-middle before:text-xs">
      <input type="text" className={inputClassName + ' pl-4'} value={x} onChange={v => onChange([checkNumber(v.target.value), y, z])} />
    </span>
    <span className="relative before:content-['Y'] before:ml-0.5 before:text-red-600 before:absolute before:left-1 before:py-1 before:align-middle before:text-xs">
      <input type="text" className={inputClassName + ' pl-4'} value={y} onChange={v => onChange([x, checkNumber(v.target.value), z])} />
    </span>
    <span className="relative before:content-['Z'] before:ml-0.5 before:text-blue-600 before:absolute before:left-1 before:py-1 before:align-middle before:text-xs">
      <input type="text" className={inputClassName + ' pl-4'} value={z} onChange={v => onChange([x, y, checkNumber(v.target.value)])} />
    </span>
  </div>)
}

interface PropertyRowProps {
  label: String,
  children: React.ReactNode
}

const ProperyRow = (props: PropertyRowProps) => {
  const { label, children } = props
  return (<div className="flex flex-row text-xs py-1 md:py-2 px-2">
    <div className="w-20 p-1">
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

// TODO - this should be used in Vector3 form?
const PropertyInput = (props: PropertyInputProps) => {
  const { value, onChange } = props
  return (<input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    className={`${inputClassName} w-52`}
  />)
}

// TODO - vlaue to store not on change but on enter
const Properties = () => {
  const selectedKey = useStore(state => state.selectedItemKey)
  const items = useStore(state => state.scene.items)
  const patchItem = useStore(state => state.patchSceneItem)
  const selectedItem = items[selectedKey]

  // todo - replace with a switch once we have more props
  if (!selectedItem) return (<div className="bg-blackpink-900 text-white h-36 md:h-64 lg:h-96">
    <GlobalProperies />
  </div>)

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
        onChange={(v) => patchItem(selectedKey, { ...selectedItem, scale: checkNumber(v) })}
        value={selectedItem.scale.toString()}
      />
    </ProperyRow>
  </div>)
}

export default Properties
