import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useFighting } from "../lib/stores/useFighting";
import { useAudio } from "../lib/stores/useAudio";
import "@fontsource/inter";

// Import our game components
import Game from "./Game";
import Menu from "./Menu";
import GameUI from "./GameUI";

// Define control keys for the game
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "punch", keys: ["KeyJ"] },
  { name: "kick", keys: ["KeyK"] },
  { name: "block", keys: ["KeyL"] },
  { name: "special", keys: ["Space"] },
  { name: "pickup", keys: ["KeyE"] },
];

// Main App component
function App() {
  const { gamePhase } = useFighting();
  const [showCanvas, setShowCanvas] = useState(false);

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <KeyboardControls map={controls}>
          {gamePhase === 'menu' && <Menu />}

          {(gamePhase === 'fighting' || gamePhase === 'round_end' || gamePhase === 'match_end') && (
            <>
              <Canvas
                shadows
                camera={{
                  position: [0, 6, 16],
                  fov: 35,
                  near: 0.1,
                  far: 1000
                }}
                gl={{
                  antialias: true,
                  powerPreference: "default"
                }}
              >
                <color attach="background" args={["#1a1a1a"]} />

                {/* Side-view lighting setup with key, fill, and rim lights */}
                <ambientLight intensity={0.3} />
                
                {/* Key light - main lighting from front-top */}
                <directionalLight 
                  position={[8, 14, 12]} 
                  intensity={1.0} 
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-far={60}
                  shadow-camera-left={-24}
                  shadow-camera-right={24}
                  shadow-camera-top={12}
                  shadow-camera-bottom={-4}
                />
                
                {/* Fill light - softer lighting from the side */}
                <directionalLight 
                  position={[-8, 6, 8]} 
                  intensity={0.4} 
                />
                
                {/* Rim light - backlighting for separation */}
                <directionalLight 
                  position={[0, 10, -10]} 
                  intensity={0.6}
                  color="#E6F3FF"
                />

                <Suspense fallback={null}>
                  <Game />
                </Suspense>
              </Canvas>
              <GameUI />
            </>
          )}
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
