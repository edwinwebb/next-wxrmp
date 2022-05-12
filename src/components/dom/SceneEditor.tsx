import useStore from "@/helpers/store"

const sceneItemTest = (props) => {
  const { image, url, scale, position, rotation } = props
  return (<li>
    <div>
      <img className="object-cover" />
    </div>
    <div>
      <p>URL</p>
      <p>scale</p>
      <p>position</p>
      <p>rotation</p>
    </div>
  </li>)
}

export default function SceneEditor() {
  const scene = useStore(store => store.scene)
  return (
    <div className="h-96">
      <h2>Scene ID</h2>
      <ul>

      </ul>
      {scene.map((item, v) => <p>{v}</p>)}
    </div>
  )
}
