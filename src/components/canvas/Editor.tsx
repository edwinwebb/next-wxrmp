import { Box } from "@react-three/drei"

const App = () => {
  return (<>
    <pointLight position={[4, 4, 2]} />
    <ambientLight intensity={.2} />
    <Box>
      <meshPhysicalMaterial color="hotpink" />
    </Box>
  </>)
}

export default App
