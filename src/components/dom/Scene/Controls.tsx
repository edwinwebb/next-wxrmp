interface ControlButtonProps {
  label: string;
  iconCode: string;
  onClick: () => void
}

const ControlButton = (props: ControlButtonProps) => {
  const { label, iconCode, onClick } = props
  return (<button className="text-sm rounded border-blackpink-800 mr-2 px-2 border-2 box-border hover:border-blackpink-300 hover:bg-blackpink-500 " onClick={() => { onClick() }}>
    <span className="font-icon mr-1">{iconCode}</span>
    <span className="text-xs">{label}</span>
  </button>)
}

interface SceneControlProps {
  saveHandler: () => void;
  forkHandler: () => void;
  addHandler: () => void;
}

const Controls = (props: SceneControlProps) => {
  const { saveHandler, forkHandler, addHandler } = props
  return (<div className="
    box-border py-2 border-b-2 md:w-full
    flex flex-row-reverse w-screen
    bg-blackpink-900 text-white  border-blackpink-800">
    <div>
      <ControlButton label="Save" iconCode="save" onClick={() => saveHandler()} />
      <ControlButton label="Fork" iconCode="fork_right" onClick={() => forkHandler()} />
      <ControlButton label="Add" iconCode="add" onClick={() => addHandler()} />
    </div>
  </div>)
}

export default Controls
