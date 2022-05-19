import { VRCanvas } from '@react-three/xr'

// https://github.com/pmndrs/drei#preload
const LCanvas = ({ children }) => {
  return (
    <VRCanvas>
      {/* <LControl /> */}
      <color attach={'background'} args={[0x210414]} />
      {children}
    </VRCanvas>
  )
}

export default LCanvas
