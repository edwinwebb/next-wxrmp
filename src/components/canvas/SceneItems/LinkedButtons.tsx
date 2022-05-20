import { MutableRefObject, useEffect, useMemo, useState } from 'react' // TODO MutableRefObject - This doesn't seem right as a type
import { useFrame } from '@react-three/fiber'
import { Button } from '@/components/canvas/UI/Buttons'
import { Box3, Group, MathUtils, Ray, Raycaster, Vector3 } from 'three' // TODO - These doesn't seem right as a type
import { useInteraction, useXR, XRController } from '@react-three/xr'


interface MoveButtonProps {
  targetRef: MutableRefObject<Group>
  sceneid: string
  position?: [number, number, number]
  aspect?: number
  onMoved: (position: [number, number, number], rotation: [number, number, number]) => void
}

export function Move(props: MoveButtonProps) {
  const { targetRef, sceneid, onMoved } = props
  const [isMoveSelect, setController] = useState<XRController | undefined>(undefined)
  const [distanceFromClick, setDistanceToMouse] = useState<number | undefined>(undefined)
  const dummyvec: Vector3 = useMemo(() => new Vector3(), [])
  const dummyray: Ray = useMemo(() => new Ray(), [])
  const dummycaster: Raycaster = useMemo(() => new Raycaster(), [])
  const MOVE_MIN_DISTANCE: number = 0.3
  const MOVE_MAX_DISTANCE: number = 10
  const { player } = useXR()

  useFrame((three) => {
    if (isMoveSelect) {
      let controller = isMoveSelect.controller
      let { axes } = isMoveSelect.inputSource.gamepad
      let scaleMod = Math.abs(1 - axes[3] * 0.01)

      // write distance to dummyvec
      dummyvec.set(0, 0, -1)
      dummyvec.applyEuler(controller.rotation)
      dummyray.set(controller.position.add(player.position), dummyvec)

      // write point at clamped distance to targetref position
      dummyray.at(
        MathUtils.clamp(controller.position.distanceTo(targetRef.current.position) * scaleMod, MOVE_MIN_DISTANCE, MOVE_MAX_DISTANCE),
        targetRef.current.position,
      )
      // write rotation to target
      targetRef.current.rotation.fromArray(controller.rotation.toArray())
    }

    // mouse positioning
    if (distanceFromClick) {
      let camera = three.camera
      if (camera) {
        dummycaster.setFromCamera(three.mouse, three.camera)
        dummycaster.ray.at(distanceFromClick, targetRef.current.position)
      }
    }
  })

  return (
    <Button
      iconkey="move"
      onSelectStart={(e) => {
        setController(e.controller)
      }}
      onSelectEnd={() => {
        if (isMoveSelect) {
          const r = targetRef.current.rotation;
          onMoved(sceneid, targetRef.current.position.toArray(), [r.x, r.y, r.z])
        }
        setController(undefined)
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        setDistanceToMouse(e.distance)
      }}
      onPointerUp={(e) => {
        e.stopPropagation()
        if (distanceFromClick) {
          const r = targetRef.current.rotation;
          onMoved(sceneid, targetRef.current.position.toArray(), [r.x, r.y, r.z])
        }
        setDistanceToMouse(undefined)
      }}
    />
  )
}

interface ScaleButtonProps {
  targetRef: MutableRefObject<Group>
  position?: [number, number, number]
  aspect?: number
  onResize: (scale: number) => void
}

export function Resize(props: ScaleButtonProps) {
  const { targetRef, position, aspect = 1, onResize } = props
  const [activeController, setController] = useState<XRController | undefined>(undefined)
  const [mouseDistance, setMouseDistance] = useState(0)
  const dummyvec = useMemo(() => new Vector3(), [])
  const boundingBox3 = useMemo(() => new Box3(), [])
  const mouseCaster = useMemo(() => new Raycaster(), [])
  const dummyray = useMemo(() => new Ray(), [])
  const patch = () => {
    onResize(targetRef.current.scale.x)
  }
  const { player } = useXR()
  const SCALE_MIN = 0.1
  const SCALE_MAX = 5

  // stop tracking on select up
  // code is repeated
  // doesn't ungreen button
  useInteraction(targetRef, 'onSelectEnd', () => {
    if (activeController) {
      patch()
    }
    setController(undefined)
  })

  // stop tracking on mouse up
  useEffect(() => {
    const handler = () => {
      if (mouseDistance) {
        patch()
      }
      setMouseDistance(0)
    }
    window.addEventListener('mouseup', handler)

    return () => {
      window.removeEventListener('mouseup', handler)
    }
  })

  useFrame((three) => {
    // intersect the targets box with the controller ray to dummyvec
    if (activeController) {
      // get a bounding box from the parent object
      boundingBox3.setFromObject(targetRef.current)
      // invert a vector
      dummyvec.set(0, 0, -1)
      // apply the controller rotation to the vector
      dummyvec.applyEuler(activeController.controller.rotation)
      // set the ray from the controller position and cast it 
      dummyray.set(activeController.controller.position.add(player.position), dummyvec)
      // get the point from the box & ray intersection
      dummyray.intersectBox(boundingBox3, dummyvec)
    }

    // TODO - improve
    // cast ray, set dummyvec with distance from click event
    // this feels wrong as the distance from the camera to button intersection
    // is variable as the scale is adjusted.
    if (mouseDistance) {
      // raycast from new mouse postion
      mouseCaster.setFromCamera(three.mouse, three.camera)
      // populate dummyvec that is from distance along ray
      mouseCaster.ray.at(mouseDistance, dummyvec)
    }

    // get distance from target postion to ray intersection point
    // This works for mouse
    if (mouseDistance || activeController) {
      let dist = dummyvec.distanceTo(targetRef.current.position)
      let scaleMod = MathUtils.clamp((dist * 2) / aspect, SCALE_MIN, SCALE_MAX)
      targetRef.current.scale.x = scaleMod
      targetRef.current.scale.y = scaleMod
    }
  })

  // TODO : Button doesn't ungreen when pointer is up from useInteraction
  return (
    <Button
      iconkey="resize"
      position={position}
      onSelectStart={(e) => {
        setController(e.controller)
      }}
      onSelectEnd={() => {
        if (activeController) {
          patch()
        }
        setController(undefined)
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        setMouseDistance(e.distance)
      }}
      onPointerUp={() => {
        if (mouseDistance) {
          patch()
        }
        setMouseDistance(0)
      }}
    />
  )
}
