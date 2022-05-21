import { Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useController, useXR, DefaultXRControllers, XRController } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { DoubleSide } from 'three'

// move the player around with thumbstick
function usePlayerControls() {
  const rightController: XRController | undefined = useController('right')
  const { player, isPresenting } = useXR()
  const speed: number = 0.01

  // todo - test how much it's called
  useEffect(() => {
    player.children[0].position.set(0, 1.3, 0)
  }, [player])

  useFrame(() => {
    if (isPresenting && rightController) {
      let { axes, buttons } = rightController?.inputSource.gamepad
      let xa: number = axes[2]
      let ya: number = axes[3]
      let isButton: boolean = buttons.some((button) => button.pressed)

      if (!isButton) {
        player.position.x += xa * speed
        player.position.z += ya * speed
      }
    }
  })
}

// move the camera around with mousedown
// todo and WASD movement
export function PlayerControls() {
  const [isDown, setDown] = useState<Array<number>>([0, 0, 0, 0])
  const { camera, mouse } = useThree()
  usePlayerControls()
  useFrame((three) => {
    const xoff = three.mouse.x - isDown[0]
    const yoff = three.mouse.y - isDown[1]
    if (isDown[0] !== 0) {
      three.camera.rotation.x = yoff + isDown[2]
      three.camera.rotation.y = xoff + isDown[3]
    }
  })
  return (
    <>
      <DefaultXRControllers />
      <Sphere
        args={[100, 100, 32]}
        onPointerDown={(e) => { setDown([mouse.x, mouse.y, camera.rotation.x, camera.rotation.y]) }}
        onPointerUp={() => { setDown([0, 0]) }}
        onPointerOut={() => { setDown([0, 0]) }}
      >
        <meshBasicMaterial side={DoubleSide} visible={false} color={'hotpink'} />
      </Sphere>
    </>

  )
}
