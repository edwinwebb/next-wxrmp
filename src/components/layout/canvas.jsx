import { VRCanvas } from '@react-three/xr'

// https://github.com/pmndrs/drei#preload
const LCanvas = ({ children }) => {
  return (
    <VRCanvas dpr={[1, 2]}>
      {children}
    </VRCanvas>
  )
}

export default LCanvas
