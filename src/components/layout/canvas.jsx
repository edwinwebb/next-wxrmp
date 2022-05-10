import { VRCanvas } from '@react-three/xr'
import { OrbitControls, Preload } from '@react-three/drei'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}

// https://github.com/pmndrs/drei#preload
const LCanvas = ({ children }) => {
  // const dom = useStore((state) => state.dom)

  return (

    <VRCanvas
      mode='concurrent'
    // onCreated={(state) => state.events.connect(dom.current)}
    >
      {/* <LControl /> */}
      <color attach={'background'} args={['hotpink']} />
      <Preload all />
      {children}
    </VRCanvas>

  )
}

export default LCanvas
