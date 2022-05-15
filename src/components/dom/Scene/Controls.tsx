interface ControlButtonProps {
  label: string;
  iconCode: string;
}

const ControlButton = (props: ControlButtonProps) => {
  const { label, iconCode } = props
  return (<span>
    <span className="font-icon">{iconCode}</span>
    <span className="hidden invisible">{label}</span>
  </span>)
}

const Controls = () => {
  return (<div className="bg-blackpink-900 text-white h-18 py-1">
    <ControlButton label="Save Scene" iconCode="save" />
    <ControlButton label="Fork Scene" iconCode="fork_right" />
    <ControlButton label="Add Item" iconCode="add" />
  </div>)
}

export default Controls
