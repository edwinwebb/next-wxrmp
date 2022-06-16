import useStore from "@/helpers/store"
import { useMemo } from "react";
import { PhotographIcon, FilmIcon, TrashIcon, RefreshIcon } from '@heroicons/react/solid'


interface GraphItemProps {
  type: string;
  selected: boolean;
  name: string;
  deleteCallback: () => void;
  resetCallback: () => void;
  selectedCallback: () => void;
}

// todo : keyodwn delete 
const GraphItem = (props: GraphItemProps) => {
  const { type, selected, name, deleteCallback, resetCallback, selectedCallback } = props;
  return (
    <li
      className={`${selected && 'bg-slate-800'} flex justify-between rounded-sm px-2 md:py-1 md:my-1 cursor-pointer`}
      onClick={(e) => { e.stopPropagation(); selectedCallback() }}>
      <div className="">
        <span className="mr-2">
          {type === 'image' && <PhotographIcon className="inline w-4 h-4" />}
          {type === 'video' && <FilmIcon className="inline w-4 h-4" />}
        </span>
        <span className="text-sm">{name}</span>
      </div>
      <div className={` ${selected ? 'visible' : 'invisible'} `}>
        <button className="mr-2 hover:text-blackpink-300" onClick={(e) => { e.stopPropagation(); resetCallback() }}>
          <RefreshIcon className="inline w-4 h-4" />
        </button>
        <button className="hover:text-blackpink-300" onClick={(e) => { e.stopPropagation(); deleteCallback() }}>
          <TrashIcon className="inline w-4 h-4" />
        </button>
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
        type={type}
        selected={itemKey === selectedKey}
        name={label}
        deleteCallback={() => { remove(itemKey) }}
        resetCallback={() => { patch(itemKey, { ...items[itemKey], position: [0, 1, -Math.random() - .5], rotation: [0, 0, 0], scale: 1 }) }}
        selectedCallback={() => { setSelected(itemKey) }}
      />)
    }
    return array
  }, [items, selectedKey])

  return (<div
    className="
      h-full overflow-scroll
      border-b-2 box-border
      bg-blackpink-900 text-white border-blackpink-800"
    onClick={(e) => { e.stopPropagation(); setSelected('') }} >
    <ul className="p-2">
      {renderedItems}
    </ul>
  </div>)
}

export default Graph
