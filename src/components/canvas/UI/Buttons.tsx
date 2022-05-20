import { ThreeEvent, Vector3 } from '@react-three/fiber'
import { Interactive, XRInteractionEvent } from '@react-three/xr'
import { cloneElement, ReactElement, useMemo, useState } from 'react'
import { Icon } from './Icon'

interface ButtonProps {
  onSelect?: (e: XRInteractionEvent) => void
  onSelectStart?: (e: XRInteractionEvent) => void
  onSelectEnd?: (e: XRInteractionEvent) => void
  onClick?: (e: ThreeEvent<MouseEvent>) => void
  onPointerDown?: (e: ThreeEvent<MouseEvent>) => void
  onPointerUp?: (e: ThreeEvent<MouseEvent>) => void
  onPointerMove?: (e: ThreeEvent<MouseEvent>) => void
  position?: Vector3
  scale?: Vector3
  visible?: boolean
  iconkey: string
}

export function Button(props: ButtonProps) {
  const {
    onSelect = () => { },
    onSelectStart = () => { },
    onSelectEnd = () => { },
    onClick = false,
    onPointerDown = () => { },
    onPointerUp = () => { },
    onPointerMove = () => { },
    position = [0, 0, 0],
    scale = [1, 1, 1],
    visible = true,
    iconkey = 'error',
  } = props
  const [isActive, setActive] = useState(false)

  return (
    <group position={position} scale={scale} visible={visible}>
      <Interactive
        onSelect={(e) => {
          onSelect(e)
        }}
        onSelectStart={(e) => {
          setActive(true)
          onSelectStart(e)
        }}
        onSelectEnd={(e) => {
          setActive(false)
          onSelectEnd(e)
        }}>
        <mesh
          onClick={(e) => {
            if (onClick) {
              onClick(e)
            }
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}>
          <boxBufferGeometry args={[0.2, 0.2, 0.01]} />
          <meshBasicMaterial color="grey" />
        </mesh>
      </Interactive>
      <Icon iconkey={iconkey} color={isActive ? 0x00ff00 : 0xffffff} fontSize={0.15} position={[0, 0, 0.0051]} />
    </group>
  )
}

interface ToggleButtonProps {
  isToggled?: boolean
  onToggle: (e: boolean) => void
  visible?: boolean
  onIconKey: string
  offIconKey: string
  position?: Vector3
}

export function ToggleButton(props: ToggleButtonProps) {
  const { isToggled = false, onToggle = () => { }, visible = true, onIconKey = 'check', offIconKey = 'cross', position = [0, 0, 0] } = props
  return (
    <Button
      iconkey={isToggled ? offIconKey : onIconKey}
      onSelect={() => {
        onToggle(isToggled)
      }}
      onClick={() => {
        onToggle(isToggled)
      }}
      visible={visible}
      position={position}
    />
  )
}

interface MediaButtonProps {
  onToggle: (e: boolean) => void
  isToggled: boolean
  position?: Vector3
}

export function Play(props: MediaButtonProps) {
  const { onToggle = (e) => { }, isToggled = false, position = [0, 0, 0] } = props
  return <ToggleButton onToggle={onToggle} onIconKey="play" offIconKey="pause" isToggled={isToggled} position={position} />
}

export function Mute(props: MediaButtonProps) {
  const { onToggle = (e) => { }, isToggled = false, position = [0, 0, 0] } = props
  return <ToggleButton onToggle={onToggle} onIconKey="mute" offIconKey="unmute" isToggled={isToggled} position={position} />
}

// interface DeleteButtonProps {
//   sceneid: string
//   position?: Vector3
// }

// export function Delete(props: DeleteButtonProps) {
//   const { sceneid, position = [0, 0, 0] } = props
//   const removeSceneItem = useStore((state) => state.removeSceneItem)
//   return (
//     <Button
//       iconkey="delete"
//       position={position}
//       onSelect={() => {
//         removeSceneItem(sceneid)
//       }}
//       onClick={() => {
//         removeSceneItem(sceneid)
//       }}
//     />
//   )
// }

// interface ExportButtonProps {
//   url: string
//   position?: Vector3
// }

// export function ExportButton(props: ExportButtonProps) {
//   const { url, position } = props
//   const handler = () => {
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         console.log('wrote ', url)
//       })
//       .catch((err) => {
//         console.error('Failed to write clipboard contents: ', err)
//       })
//   }
//   return <Button iconkey="copy" position={position} onSelect={() => handler()} onClick={() => handler()} />
// }

// interface ImportButtonProps {
//   sceneid: string
//   position?: Vector3
// }

// TODO - copy/paste mixins?
// export function ImportButton({ sceneid, position }: ImportButtonProps) {
//   const patchSceneItemURL = useStore((state) => state.patchSceneItemURL)
//   const handler = () => {
//     navigator.clipboard
//       .readText()
//       .then((pastedText) => {
//         patchSceneItemURL(sceneid, pastedText)
//       })
//       .catch((err) => {
//         console.error('Failed to read clipboard contents: ', err)
//       })
//   }
//   return <Button iconkey="paste" position={position} onSelect={() => handler()} onClick={() => handler()} />
// }

interface ButtonRowProps {
  children: ReactElement[]
  childSpacing: number
  y: number
}

export function ButtonRow(props: ButtonRowProps) {
  const { children = [], childSpacing = 0.2, y = 0 } = props
  const memoedChildren = useMemo(() => {
    return children.map((item, index) => {
      const x = (-children.length * childSpacing) / 2 + index * childSpacing + childSpacing / 2
      return cloneElement(item, {
        key: 'button_' + index,
        position: [x, y, 0],
      })
    })
  }, [children, childSpacing, y])
  return <group>{memoedChildren}</group>
}
