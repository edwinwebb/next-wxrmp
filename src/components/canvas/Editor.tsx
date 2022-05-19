import { Box, OrbitControls } from "@react-three/drei"
import { PlayerControls } from "@/components/canvas/Controls/PlayerControls"

const App = () => {

  return (<>
    <pointLight position={[4, 4, 4]} />
    <ambientLight intensity={.2} />
    <PlayerControls />
    <Box position={[0, 2, -5]}>
      <meshPhysicalMaterial color="hotpink" />
    </Box>
  </>)
}

export default App
