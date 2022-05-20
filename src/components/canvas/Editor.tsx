import { Box, OrbitControls, TransformControls } from "@react-three/drei"
import { PlayerControls } from "@/components/canvas/Controls/PlayerControls"
import { Icon } from "@/components/canvas/UI/Icon"
import useStore from "@/helpers/store"
import { useMemo } from "react"
import { Image } from '@/components/canvas/SceneItems/Image'
import { useThree } from "@react-three/fiber"

function StoreScene() {
  const items = useStore((s) => s.scene.items)
  const select = useStore(s => s.setSelectedItemKey)
  const selectedKey = useStore(s => s.selectedItemKey)
  const renderedItems = useMemo(() => {
    let array = []
    for (const itemKey in items) {
      const { url, position, rotation, scale } = items[itemKey]
      array.push(
        <group
          key={itemKey}
          position={position}
          rotation={rotation}
          scale={scale}
          name={itemKey}
          onClick={(e) => { select(itemKey) }}
        >
          <Image
            url={url}
            aspectCallback={(aspect) => { console.log(aspect) }}
            selected={itemKey === selectedKey}
          />
        </group>)
    }
    return array
  }, [items, selectedKey])

  return <>{renderedItems}</>
}


const App = () => {
  return (<>
    <PlayerControls />
    <StoreScene />
  </>)
}

export default App
