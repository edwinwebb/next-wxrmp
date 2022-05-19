import { useTexture, Plane } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import { DoubleSide } from 'three'
import { Icon } from '../UI/Icon'
// import { ErrorBoundary } from '../Helpers'

const DEFAULT_URL = './test-images/404-image.png'

interface ImagePlaneProps {
  url: string
  aspectCallback: (apect: number) => void
}

// todo - bad pattern with aspect calculation
function ImagePlane(props: ImagePlaneProps) {
  const { url = DEFAULT_URL, aspectCallback = () => { } } = props
  const texture = useTexture(url)
  const aspect = texture.image.height / texture.image.width

  useEffect(() => {
    aspectCallback(aspect)
  }, [aspect, aspectCallback, url])

  return (
    <group>
      <Plane args={[1, 1]} scale={[1, aspect, 1]}>
        <meshStandardMaterial map={texture} attach="material" side={DoubleSide} transparent={true} />
      </Plane>
    </group>
  )
}

interface ImageProps {
  url: string
  aspectCallback: (apect: number) => void
}

export function Image(props: ImageProps) {
  const { url = DEFAULT_URL, aspectCallback = () => { } } = props

  return (
    // <ErrorBoundary fallback={<Icon iconkey="error" fontSize={1} color={0x888888} />}>
    <Suspense fallback={<Icon iconkey="image" fontSize={1} color={0x888888} />}>
      <ImagePlane url={url} aspectCallback={aspectCallback} />
    </Suspense>
    // </ErrorBoundary>
  )
}
