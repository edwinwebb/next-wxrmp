import { Box, Sphere } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { Icon } from './Icon'
import useStore from "@/helpers/store"

interface ShelfItemProps {
  onInteract: () => void
  icon: string
  x: number
}

function ShelfItem(props: ShelfItemProps) {
  const { onInteract = () => { }, icon = 'copy', x = 0 } = props
  const color = 0x000000
  const checkColor = 0x00ff00
  const [timeoutIsRunning, setTimeoutIsRunning] = useState(false)

  useEffect(() => {
    let timer: number
    if (timeoutIsRunning) {
      timer = window.setTimeout(() => {
        setTimeoutIsRunning(false)
      }, 800)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [timeoutIsRunning])

  const clickHandler = () => {
    setTimeoutIsRunning(true)
    onInteract()
  }

  return (
    <group position={[x, 0.1, 0]}>
      <Icon
        iconkey={timeoutIsRunning ? 'done' : icon}
        fontSize={0.05}
        color={timeoutIsRunning ? checkColor : color} />
      <Interactive onSelect={clickHandler}>
        <Sphere args={[0.05, 32, 32]} onClick={clickHandler}>
          <meshPhysicalMaterial transparent opacity={0.2} />
        </Sphere>
      </Interactive>
    </group>
  )
}

export default function Shelf() {
  //const [addSceneItem, importScene, toggleForcePlay, forcePlay] = useStore((state) => [state.addSceneItem, state.importScene, state.toggleForcePlay, state.forcePlay])
  const [shelfY, setShelfY] = useState(0.9)
  const shelfColor = 0x999999
  const playAllHandler = () => {
    console.log('playall handler')
    //toggleForcePlay()
  }
  return (
    <group position={[0, shelfY, -0.5]}>
      <Box args={[1, 0.01, 0.1]} position={[0, 0.04, 0]}>
        <meshStandardMaterial color={shelfColor} />
      </Box>
      <ShelfItem
        icon="image"
        onInteract={() => {
          //addSceneItem('image', [0, 1, -1 - Math.random()], [0, 0, 0], './test-images/1080x720.png')
        }}
        x={-0.4}
      />
      <ShelfItem
        icon="video"
        onInteract={() => {
          //addSceneItem('video', [0, 1, -1 - Math.random()], [0, 0, 0], 'https://i.imgur.com/RfqezsM.mp4')
        }}
        x={-0.2}
      />
      <ShelfItem
        icon={true ? "pause" : "play"}
        onInteract={() => {
          playAllHandler()
        }}
        x={0}
      />
      <ShelfItem
        icon="save"
        onInteract={() => {
          // importHandler()
        }}
        x={0.2}
      />
      <ShelfItem
        icon="reset"
        onInteract={() => {
          // exportHandler()
        }}
        x={0.4}
      />
      <Interactive
        onSelect={() => {
          setShelfY(shelfY + 0.1)
        }}>
        <Icon
          iconkey="up"
          color={shelfColor}
          onClick={() => setShelfY(shelfY + 0.1)}
          fontSize={0.05}
          position={[0.52, 0.075, 0]} />
      </Interactive>
      <Interactive
        onSelect={() => {
          setShelfY(shelfY - 0.1)
        }}>
        <Icon
          iconkey="down"
          color={shelfColor}
          onClick={() => setShelfY(shelfY - 0.1)}
          fontSize={0.05}
          position={[0.52, 0.025, 0]} />
      </Interactive>
    </group>
  )
}
