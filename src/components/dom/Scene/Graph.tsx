interface GraphItemProps {
  iconCode: string;
  selected: boolean;
  name: string;
}

const GraphItem = (props: GraphItemProps) => {
  const { iconCode, selected, name } = props;
  return (
    <li className={`${selected && 'bg-slate-800'} flex justify-between`}>
      <div className="">
        <span className="font-icon">{iconCode}</span>
        <span>{name}</span>
      </div>
      <div className="">
        <span className="font-icon">restart_alt</span>
        <span className="font-icon">delete</span>
      </div>
    </li>
  )
}

const Graph = () => {
  return (<div className="bg-blackpink-900 text-white h-52 md:flex-grow">
    <ul>
      <GraphItem iconCode="image" selected={false} name={'image 1'} />
    </ul>
  </div>)
}

export default Graph
