interface Vector3FormProps {
  onChange: (triplet: [number, number, number]) => void
  label: string
  vector: [number, number, number]
}

const Vector3Form = (props: Vector3FormProps) => {
  const { onChange, label, vector } = props
  const [x, y, z] = vector
  const className = "text-xs w-16 p-0 px-1 mr-2 rounded-sm bg-slate-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"

  return (<div className="mb-1 text-xs">
    <span className="w-8 inline-block">{label}</span>
    <input type="text" className={className} value={x} onChange={v => onChange([parseFloat(v.target.value), y, z])} />
    <input type="text" className={className} value={y} onChange={v => onChange([x, parseFloat(v.target.value), z])} />
    <input type="text" className={className} value={z} onChange={v => onChange([x, y, parseFloat(v.target.value)])} />
  </div>)
}

const Properties = () => {
  return (<div className="bg-blackpink-900 text-white h-36 md:h-52">
    <Vector3Form vector={[1, 2, 3]} onChange={(v) => { console.log(v) }} label="position" />
  </div>)
}

export default Properties
