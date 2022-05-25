import { Edges } from '@react-three/drei'
import { Icon } from '@/components/canvas/UI/Icon'
import { ErrorBoundary } from '@/helpers/ErrorBoundary'
import { Move, Resize } from '@/components/canvas/SceneItems/LinkedButtons'
import { Interactive } from '@react-three/xr'
import { Button, ButtonRow } from '@/components/canvas/UI/Buttons'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { DoubleSide, Mesh, sRGBEncoding, Group } from 'three'
import { generateUUID } from 'three/src/math/MathUtils'

interface VideoPlaneProps {
  url: string
  muted: boolean
  play: boolean
  aspectCallback: (aspect: number) => void
  selected: boolean
}

function VideoPlane(props: VideoPlaneProps) {
  const { url, muted, play, aspectCallback, selected } = props
  const videoMeshRef = useRef<Mesh>(null!)
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.crossOrigin = 'anonymous'
    vid.src = url
    vid.muted = muted
    vid.loop = true
    vid.id = generateUUID()
    return vid
  })

  useEffect(() => {
    const onCanPlay = () => {
      if (videoMeshRef.current) {
        let aspect = video.videoHeight / video.videoWidth
        aspectCallback(aspect)
        videoMeshRef.current.scale.y = aspect
      }
    }

    video.addEventListener('canplay', onCanPlay)

    return () => {
      video.removeEventListener('canplay', onCanPlay)
    }
  }, [video, aspectCallback, videoMeshRef])

  useEffect(() => {
    video.muted = muted
  }, [muted, video])

  useEffect(() => {
    if (play) {
      video.play()
    } else {
      video.pause()
    }
  }, [play, video])

  useEffect(() => {
    video.src = url
  }, [url, video])

  return (
    <mesh ref={videoMeshRef} scale={[1, 1, 1]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial side={DoubleSide}>
        <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
      <Edges color={'hotpink'} scale={1.1} visible={selected} />
    </mesh>
  )
}

interface VideoSceneItemProps {
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
}

export function VideoSceneItem({ position, rotation, scale, url, name, selected, onMove, onScale, onDelete, onSelect }: VideoSceneItemProps) {
  const groupRef = useRef<Group>(null!)
  const [childAspect, setChildAspect] = useState(1)
  const [isHover, setHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
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
          <Suspense fallback={<Icon iconkey="video" fontSize={1} color={0x888888} />}>
            <VideoPlane
              aspectCallback={(ratio) => setChildAspect(ratio)}
              url={url}
              play={(playing)}
              muted={muted}
              selected={selected} />
          </Suspense>
        </ErrorBoundary>
        <group visible={isHover} position={[0, 0, 0.0051]}>
          <Move targetRef={groupRef} onMoved={(p, r) => { onMove(p, r) }} />
          <Resize targetRef={groupRef} onResize={s => onScale(s)} position={[0.4, childAspect / 2 - 0.1, 0]} />
          <ButtonRow y={childAspect / -2 + 0.03} childSpacing={0.2}>
            <Button iconkey={playing ? "pause" : "pplay"} onClick={() => { setPlaying(!playing) }} />
            <Button iconkey={muted ? "mute" : "unmute"} onClick={() => { setMuted(!muted) }} />
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
          </ButtonRow>
        </group>
      </Interactive>
    </group>
  )
}
