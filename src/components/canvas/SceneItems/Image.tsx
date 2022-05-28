import { useTexture, Edges } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { DoubleSide, Group } from 'three'
import { Icon } from '@/components/canvas/UI/Icon'
import { ErrorBoundary } from '@/helpers/ErrorBoundary'
import { Move, Resize } from '@/components/canvas/SceneItems/LinkedButtons'
import { Interactive } from '@react-three/xr'
import { Button, ButtonRow } from '@/components/canvas/UI/Buttons'
import { useCopyToClipboard, usePasteFromClipboard } from '@/helpers/useClipboard'

interface ImagePlaneProps {
  url: string;
  aspectCallback: (apect: number) => void;
  selected: boolean;
}

// todo - bad pattern with aspect calculation
// update may 2022 not sure what the bad pattern is
function ImagePlane(props: ImagePlaneProps) {
  const { url, aspectCallback, selected } = props
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

interface ImageSceneItemProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  name: string
  url: string
  selected: boolean,
  onMove: (position: [number, number, number], rotation: [number, number, number]) => void
  onScale: (scale: number) => void
  onDelete: (key: string) => void
  onSelect: (key: string) => void
  onPaste: (text: string | null) => void

}

export function ImageSceneItem({ position, rotation, scale, name, url, selected, onMove, onScale, onDelete, onSelect, onPaste }: ImageSceneItemProps) {
  const groupRef = useRef<Group>(null!)
  const [childAspect, setChildAspect] = useState(1)
  const [isHover, setHover] = useState(false)
  const [pastedText, paste] = usePasteFromClipboard()
  const [, copy] = useCopyToClipboard()

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      name={name}
      onClick={() => { onSelect(name) }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}>
      <Interactive
        onHover={() => {
          setHover(true)
        }}
        onBlur={() => {
          setHover(false)
        }}>
        <ErrorBoundary fallback={<Icon iconkey="error" fontSize={1} color={0x888888} />}>
          <Suspense fallback={<Icon iconkey="image" fontSize={1} color={0x888888} />}>
            <ImagePlane url={url} aspectCallback={(aspect) => setChildAspect(aspect)} selected={selected} />
          </Suspense>
        </ErrorBoundary>
        <group visible={isHover} position={[0, 0, 0.0051]}>
          <Move targetRef={groupRef} onMoved={(p, r) => { onMove(p, r) }} />
          <Resize targetRef={groupRef} aspect={childAspect} position={[0.4, childAspect / 2 - 0.1, 0]} onResize={s => onScale(s)} />
          <ButtonRow y={childAspect / -2 + 0.03} childSpacing={0.2}>
            <Button
              iconkey="delete"
              position={[0, childAspect / -2 + 0.03, 0]}
              onSelect={() => {
                onDelete(name)
              }}
              onClick={() => {
                onDelete(name)
              }}
            />
            <Button iconkey='copy' onSelect={() => { copy(url) }} onClick={() => { copy(url) }} />
            <Button iconkey='paste' onClick={async () => { await paste(); onPaste(pastedText) }} onSelect={async () => { await paste(); onPaste(pastedText) }} />
          </ButtonRow>

        </group>
      </Interactive>
    </group>
  )
}
