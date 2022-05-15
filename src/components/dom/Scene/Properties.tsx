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
}

const PropertyInput = (props: PropertyInputProps) => {
  const { value } = props
  return (<input
    type="text"
    value={value}
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
  return (<div className="bg-blackpink-900 text-white h-36 md:h-52 lg:h-96">
    <ProperyRow label={"Name"}>
      <PropertyInput
        value={'Image 1'}
      />
    </ProperyRow>
    <ProperyRow label={"URL"}>
      <PropertyInput
        value={'URL Value'}
      />
    </ProperyRow>
    <ProperyRow label={"Position"}>
      <Vector3Form vector={[1, 2, 3]} onChange={(v) => { console.log(v) }} />
    </ProperyRow>
    <ProperyRow label={"Rotation"}>
      <Vector3Form vector={[1, 2, 3]} onChange={(v) => { console.log(v) }} />
    </ProperyRow>
    <ProperyRow label={"Scale"}>
      <PropertyInput
        value={'0'}
      />
    </ProperyRow>
  </div>)
}

export default Properties
