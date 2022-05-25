import { PlayerControls } from "@/components/canvas/Controls/PlayerControls"
import useStore from "@/helpers/store"
import { useMemo } from "react"
import { ImageSceneItem } from '@/components/canvas/SceneItems/Image'
import { VideoSceneItem } from '@/components/canvas/SceneItems/Video'

function StoreScene() {
  const items = useStore((s) => s.scene.items)
  const bg = useStore(s => s.scene.backgroundcolor)
  const select = useStore(s => s.setSelectedItemKey)
  const selectedKey = useStore(s => s.selectedItemKey)
  const patchItem = useStore(s => s.patchSceneItem)
  const deleteItem = useStore(s => s.removeSceneItem)
  const renderedItems = useMemo(() => {
    let array = []
    for (const itemKey in items) {
      const { url, position, rotation, scale, type } = items[itemKey]
      if (type === 'video') {
        array.push(
          <VideoSceneItem
            key={itemKey}
            position={position}
            rotation={rotation}
            scale={scale}
            name={itemKey}
            url={url}
            selected={selectedKey === itemKey}
            onMove={(position, rotation) => { patchItem(itemKey, { ...items[itemKey], position, rotation }) }}
            onScale={(scale) => { patchItem(itemKey, { ...items[itemKey], scale }) }}
            onDelete={key => { deleteItem(key) }}
            onSelect={() => { select(itemKey) }}
          />)
      } else {
        array.push(
          <ImageSceneItem
            key={itemKey}
            position={position}
            rotation={rotation}
            scale={scale}
            name={itemKey}
            url={url}
            selected={selectedKey === itemKey}
            onMove={(position, rotation) => { patchItem(itemKey, { ...items[itemKey], position, rotation }) }}
            onScale={(scale) => { patchItem(itemKey, { ...items[itemKey], scale }) }}
            onDelete={key => { deleteItem(key) }}
            onSelect={() => { select(itemKey) }}
          />)
      }
    }
    return array
  }, [items, selectedKey])

  return <>
    <color attach={'background'} args={[bg]} />
    {renderedItems}
  </>
}

const App = () => {
  return (<>
    <PlayerControls />
    <StoreScene />
  </>)
}

export default App
