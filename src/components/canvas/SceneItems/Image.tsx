import { useTexture, Plane, Edges } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { DoubleSide, Group } from 'three'
import { Icon } from '@/components/canvas/UI/Icon'
import { ErrorBoundary } from '@/helpers/ErrorBoundary'
import { Move, Resize } from '@/components/canvas/SceneItems/LinkedButtons'
import { Interactive } from '@react-three/xr'
import { ButtonRow, Button } from '@/components/canvas/UI/Buttons'


const DEFAULT_URL = './test-images/404-image.png'

interface ImagePlaneProps {
  url: string;
  aspectCallback: (apect: number) => void;
  selected: boolean;
}

// todo - bad pattern with aspect calculation
function ImagePlane(props: ImagePlaneProps) {
  const { url = DEFAULT_URL, aspectCallback = () => { }, selected } = props
  const texture = useTexture(url)
  const aspect = texture.image.height / texture.image.width

  useEffect(() => {
    aspectCallback(aspect)
  }, [aspect, aspectCallback])

  return (
    <mesh scale={[1, aspect, 1]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} attach="material" side={DoubleSide} transparent={true} color="white" toneMapped={false} />
      <Edges color={'hotpink'} scale={1.1} visible={selected} />
    </mesh>
  )
}

interface ImageProps {
  url: string
  aspectCallback: (apect: number) => void
  selected: boolean
}

export function Image(props: ImageProps) {
  const { url = DEFAULT_URL, aspectCallback = () => { }, selected } = props
  console.log(url)
  return (
    <ErrorBoundary fallback={<Icon iconkey="error" fontSize={1} color={0x888888} />}>
      <Suspense fallback={<Icon iconkey="image" fontSize={1} color={0x888888} />}>
        <ImagePlane url={url} aspectCallback={aspectCallback} selected={selected} />
      </Suspense>
    </ErrorBoundary>
  )
}

interface ImageSceneItemProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  name: string
  url: string
  selected: boolean
}

export function ImageSceneItem({ position, rotation, scale, name, url, selected }: ImageSceneItemProps) {
  const groupRef = useRef<Group>(null!)
  const [childAspect, setChildAspect] = useState(1)
  const [isHover, setHover] = useState(false)

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      name={name}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}>
      <Interactive
        onHover={() => {
          setHover(true)
        }}
        onBlur={() => {
          setHover(false)
        }}>
        <ImagePlane aspectCallback={(ratio) => setChildAspect(ratio)} url={url} selected={true} />
        <group visible={isHover} position={[0, 0, 0.0051]}>
          <Move targetRef={groupRef} onMoved={(p, r) => { console.log(p, r) }} />
          <Resize targetRef={groupRef} position={[0.4, childAspect / 2 - 0.1, 0]} onResize={s => console.log(s)} />
          <Button
            iconkey="delete"
            position-y={childAspect / -2 + 0.03}
            onSelect={() => {
              console.log(name)
            }}
            onClick={() => {
              console.log(name)
            }}
          />
        </group>
      </Interactive>
    </group>
  )
}
