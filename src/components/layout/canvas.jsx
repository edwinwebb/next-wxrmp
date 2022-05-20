import { VRCanvas } from '@react-three/xr'

// https://github.com/pmndrs/drei#preload
const LCanvas = ({ children }) => {
  return (
    <VRCanvas dpr={[1, 2]}>
      <color attach={'background'} args={[0xFFFFFF]} />
      {children}
    </VRCanvas>
  )
}

export default LCanvas
