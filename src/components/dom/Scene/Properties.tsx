import { Children } from "react"

interface Vector3FormProps {
  onChange: (triplet: [number, number, number]) => void
  vector: [number, number, number]
}

const Vector3Form = (props: Vector3FormProps) => {
  const { onChange, vector } = props
  const [x, y, z] = vector
  const className = "text-xs w-16 p-0 px-1 mr-2 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"

  return (<div className="mb-1 text-xs">
    <input type="text" className={className} value={x} onChange={v => onChange([parseFloat(v.target.value), y, z])} />
    <input type="text" className={className} value={y} onChange={v => onChange([x, parseFloat(v.target.value), z])} />
    <input type="text" className={className} value={z} onChange={v => onChange([x, y, parseFloat(v.target.value)])} />
  </div>)
}

interface PropertyRowProps {
  label: String,
  children: React.ReactNode
}

const ProperyRow = (props: PropertyRowProps) => {
  const { label, children } = props
  return (<div>
    <div>
      <span>{label}</span>
    </div>
    <div>
      {children}
    </div>
  </div>)
}

const Properties = () => {
  return (<div className="bg-blackpink-900 text-white h-36 md:h-52 lg:h-96">
    <ProperyRow label={"Name"}>
      <input
        type="text"
        value={'Image 1'}
        className='text-xs'
      />
    </ProperyRow>
    <ProperyRow label={"URL"}>
      <input
        type="text"
        value={'tgest url'}
        className='text-xs'
      />
    </ProperyRow>
    <ProperyRow label={"Position"}>
      <Vector3Form vector={[1, 2, 3]} onChange={(v) => { console.log(v) }} />
    </ProperyRow>
    <ProperyRow label={"Rotation"}>
      <Vector3Form vector={[1, 2, 3]} onChange={(v) => { console.log(v) }} />
    </ProperyRow>
    <ProperyRow label={"Scale"}>
      <input />
    </ProperyRow>
  </div>)
}

export default Properties
