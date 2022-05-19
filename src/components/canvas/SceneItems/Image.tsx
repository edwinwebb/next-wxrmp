import { useTexture, Plane, Edges } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { DoubleSide } from 'three'
import { Icon } from '@/components/canvas/UI/Icon'
import { ErrorBoundary } from '@/helpers/ErrorBoundary'

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
  }, [aspect, aspectCallback, url])

  return (
    <mesh scale={[1, aspect, 1]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} attach="material" side={DoubleSide} transparent={true} />
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

  return (
    <ErrorBoundary fallback={<Icon iconkey="error" fontSize={1} color={0x888888} />}>
      <Suspense fallback={<Icon iconkey="image" fontSize={1} color={0x888888} />}>
        <ImagePlane url={url} aspectCallback={aspectCallback} selected={selected} />
      </Suspense>
    </ErrorBoundary>
  )
}
