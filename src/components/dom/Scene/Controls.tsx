interface ControlButtonProps {
  label: string;
  iconCode: string;
  onClick: () => void
}

const ControlButton = (props: ControlButtonProps) => {
  const { label, iconCode, onClick } = props
  return (<span onClick={() => { onClick() }}>
    <span className="font-icon">{iconCode}</span>
    <span className="hidden invisible">{label}</span>
  </span>)
}

interface SceneControlProps {
  saveHandler: () => void;
  forkHandler: () => void;
}

const Controls = (props: SceneControlProps) => {
  const { saveHandler, forkHandler } = props
  return (<div className="bg-blackpink-900 text-white h-18 py-1">
    <span className="font-icon">account_tree</span>
    <span>SCENE_ID</span>
    <ControlButton label="Save Scene" iconCode="save" onClick={() => saveHandler()} />
    <ControlButton label="Fork Scene" iconCode="fork_right" onClick={() => forkHandler()} />
    <ControlButton label="Add Item" iconCode="add" onClick={() => console.log('add item to scene')} />
  </div>)
}

export default Controls
