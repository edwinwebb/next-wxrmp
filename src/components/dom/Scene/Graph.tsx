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
    <li
      className={`${selected && 'bg-slate-800'} flex justify-between rounded-sm px-2 md:py-1 md:my-1 cursor-pointer`}
      onClick={(e) => { e.stopPropagation(); selectedCallback() }}>
      <div className="">
        <span className="font-icon mr-2">{iconCode}</span>
        <span className="text-sm">{name}</span>
      </div>
      <div className={` ${selected ? 'visible' : 'invisible'} `}>
        <button className="font-icon mr-2 hover:text-blackpink-300" onClick={(e) => { e.stopPropagation(); resetCallback() }}>restart_alt</button>
        <button className="font-icon hover:text-blackpink-300" onClick={(e) => { e.stopPropagation(); deleteCallback() }}>delete</button>
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
        key={'sg_' + itemKey}
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

  return (<div
    className="
    h-full
    border-b-2 
    bg-blackpink-900 text-white border-blackpink-800"
    onClick={(e) => { e.stopPropagation(); setSelected('') }} >
    <ul className="p-2">
      {renderedItems}
    </ul>
  </div>)
}

export default Graph
