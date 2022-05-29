import { PlayerControls } from "@/components/canvas/Controls/PlayerControls"
import useStore from "@/helpers/store"
import { useMemo } from "react"
import { ImageSceneItem } from '@/components/canvas/SceneItems/Image'
import { VideoSceneItem } from '@/components/canvas/SceneItems/Video'
import Shelf from '@/components/canvas/UI/Shelf'

function StoreScene() {
  const items = useStore((s) => s.scene.items)
  const bg = useStore(s => s.scene.backgroundcolor)
  const playAllState = useStore(s => s.playAllState)
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
            playAllState={playAllState}
            selected={selectedKey === itemKey}
            onMove={(position, rotation) => { patchItem(itemKey, { ...items[itemKey], position, rotation }) }}
            onScale={(scale) => { patchItem(itemKey, { ...items[itemKey], scale }) }}
            onDelete={key => { deleteItem(key) }}
            onSelect={() => { select(itemKey) }}
            onPaste={(url) => { patchItem(itemKey, { ...items[itemKey], url: url ? url : items[itemKey].url }) }}
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
            onPaste={(url) => { patchItem(itemKey, { ...items[itemKey], url: url ? url : items[itemKey].url }) }}
          />)
      }
    }
    return array
  }, [items, selectedKey, playAllState])

  return <>
    <color attach={'background'} args={[bg]} />
    {renderedItems}
  </>
}

const App = () => {
  return (<>
    <PlayerControls />
    <StoreScene />
    <Shelf />
  </>)
}

export default App
