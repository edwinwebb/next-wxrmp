import { VRCanvas } from '@react-three/xr'
import { OrbitControls, Preload } from '@react-three/drei'

// https://github.com/pmndrs/drei#preload
const LCanvas = ({ children }) => {
  return (
    <VRCanvas>
      {/* <LControl /> */}
      <color attach={'background'} args={[0x000000]} />
      <Preload all />
      {children}
      <OrbitControls />
    </VRCanvas>
  )
}

export default LCanvas
