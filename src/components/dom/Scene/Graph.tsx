import useStore from "@/helpers/store"
import { useMemo } from "react";

interface GraphItemProps {
  iconCode: string;
  selected: boolean;
  name: string;
  deleteCallback: () => void
}

// todo : keyodwn delete 
const GraphItem = (props: GraphItemProps) => {
  const { iconCode, selected, name, deleteCallback } = props;
  return (
    <li className={`${selected && 'bg-slate-800'} flex justify-between`}>
      <div className="">
        <span className="font-icon">{iconCode}</span>
        <span>{name}</span>
      </div>
      <div className="">
        <span className="font-icon">restart_alt</span>
        <span className="font-icon" onClick={() => deleteCallback()}>delete</span>
      </div>
    </li>
  )
}

const Graph = () => {
  const { items } = useStore(state => state.scene)
  const remove = useStore(state => state.removeSceneItem)

  const renderedItems = useMemo(() => {
    let array = []
    for (const item in items) {
      array.push(<GraphItem
        iconCode="image"
        selected={false}
        name={item}
        deleteCallback={() => { console.log(item); remove(item) }}
      />)
    } return array
  }, [items])

  return (<div className="bg-blackpink-900 text-white h-52 md:flex-grow">
    <ul>
      {renderedItems}
    </ul>
  </div>)
}

export default Graph
