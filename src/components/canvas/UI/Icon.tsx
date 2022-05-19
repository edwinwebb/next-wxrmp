import { Text } from '@react-three/drei'
import { ThreeEvent, Color, Vector3 } from '@react-three/fiber'
import { Suspense } from 'react'
// @ts-ignore 
import ICON_FONT_PATH from '../../../../public/fonts/MaterialIconsOutlined-Regular.otf'


// https://fonts.google.com/icons?icon.query=image

interface IconProps {
  iconkey?: string
  fontSize?: number
  color?: Color
  position?: Vector3
  onClick?: (e: ThreeEvent<MouseEvent>) => void
}

export function Icon(props: IconProps) {
  const { iconkey, fontSize = 0.1, color = 0x000000, onClick = () => { }, position = [0, 0, 0] } = props
  let googlekey: string

  switch (iconkey) {
    case 'move':
      googlekey = 'zoom_out_map'
      break
    case 'resize':
      googlekey = 'open_in_full'
      break
    case 'import':
    case 'paste':
      googlekey = 'content_paste'
      break
    case 'export':
    case 'copy':
      googlekey = 'content_copy'
      break
    case 'save':
      googlekey = 'save'
      break
    case 'trash':
    case 'delete':
      googlekey = 'delete'
      break
    case 'image':
      googlekey = 'image'
      break
    case 'video':
      googlekey = 'videocam'
      break
    case 'audio':
    case 'sound':
    case 'speaker':
      googlekey = 'speaker'
      break
    case '3d':
    case 'gltf':
      googlekey = 'view_in_ar'
      break
    case 'play':
      googlekey = 'play_arrow'
      break
    case 'pause':
      googlekey = 'pause'
      break
    case 'volume_off':
    case 'mute':
    case 'muted':
      googlekey = 'volume_off'
      break
    case 'volume_on':
    case 'unmute':
    case 'unmuted':
      googlekey = 'volume_up'
      break
    case 'scene':
    case 'hub':
      googlekey = 'device_hub'
      break
    case 'navigate_next':
      googlekey = 'navigate_next'
      break
    case 'navigate_before':
      googlekey = 'navigate_before'
      break
    case 'up':
    case 'expand_less':
      googlekey = 'expand_less'
      break
    case 'down':
    case 'expand_more':
      googlekey = 'expand_more'
      break
    case 'done':
    case 'check':
      googlekey = 'done'
      break
    default:
      googlekey = 'call_missed_outgoing'
  }
  return (
    <Text font={ICON_FONT_PATH} onClick={onClick} color={color} anchorX="center" anchorY="middle" fontSize={fontSize} position={position}>
      {googlekey}
    </Text>
  )
}
