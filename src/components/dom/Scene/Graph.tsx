import useStore from "@/helpers/store"
import { useMemo } from "react";

interface GraphItemProps {
  iconCode: string;
  selected: boolean;
  name: string;
  deleteCallback: () => void;
  resetCallback: () => void;
  selectedCallback: () => void;
}

// todo : keyodwn delete 
const GraphItem = (props: GraphItemProps) => {
  const { iconCode, selected, name, deleteCallback, resetCallback, selectedCallback } = props;
  return (
    <li className={`${selected && 'bg-slate-800'} flex justify-between`} onClick={() => { selectedCallback() }}>
      <div className="">
        <span className="font-icon">{iconCode}</span>
        <span>{name}</span>
      </div>
      <div className="">
        <span className="font-icon" onClick={(e) => { e.stopPropagation(); resetCallback() }}>restart_alt</span>
        <span className="font-icon" onClick={(e) => { e.stopPropagation(); deleteCallback() }}>delete</span>
      </div>
    </li>
  )
}

const Graph = () => {
  const { items } = useStore(state => state.scene)
  const remove = useStore(state => state.removeSceneItem)
  const patch = useStore(state => state.patchSceneItem)
  const selectedKey = useStore(state => state.selectedItemKey)
  const setSelected = useStore(state => state.setSelectedItemKey)

  const renderedItems = useMemo(() => {
    let array = []
    for (const itemKey in items) {
      const { type, label } = items[itemKey]
      array.push(<GraphItem
        iconCode={type === "image" ? "image" : "movie"}
        selected={itemKey === selectedKey}
        name={label}
        deleteCallback={() => { remove(itemKey) }}
        resetCallback={() => { patch(itemKey, { ...items[itemKey], position: [0, 0, Math.random()], rotation: [0, 0, 0], scale: 1 }) }}
        selectedCallback={() => { setSelected(itemKey) }}
      />)
    }
    return array
  }, [items, selectedKey])

  return (<div className="bg-blackpink-900 text-white h-52 md:flex-grow">
    <ul>
      {renderedItems}
    </ul>
  </div>)
}

export default Graph
