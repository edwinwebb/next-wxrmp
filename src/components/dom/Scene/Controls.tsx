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
  addHandler: () => void;
}

const Controls = (props: SceneControlProps) => {
  const { saveHandler, forkHandler, addHandler } = props
  return (<div className="bg-blackpink-900 text-white h-18 py-1 flex flex-row justify-between">
    <div>
      <span className="font-icon">account_tree</span>
      <span>SCENE_ID</span>
    </div>
    <div>
      <ControlButton label="Save Scene" iconCode="save" onClick={() => saveHandler()} />
      <ControlButton label="Fork Scene" iconCode="fork_right" onClick={() => forkHandler()} />
      <ControlButton label="Add Item" iconCode="add" onClick={() => addHandler()} />
    </div>
  </div>)
}

export default Controls
