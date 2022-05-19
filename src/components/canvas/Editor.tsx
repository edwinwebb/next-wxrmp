import { Box, OrbitControls } from "@react-three/drei"
import { PlayerControls } from "@/components/canvas/Controls/PlayerControls"
import { Icon } from "@/components/canvas/UI/Icon"

const App = () => {

  return (<>
    <pointLight position={[4, 4, 4]} />
    <ambientLight intensity={.2} />
    <PlayerControls />
    <Icon position={[0, 2, -5]} color={0xFFFFFF} />

    <Box position={[0, 2, -10]}>
      <meshPhysicalMaterial color="hotpink" />
    </Box>
  </>)
}

export default App
