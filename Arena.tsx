import { useTexture } from "@react-three/drei";

export default function Arena() {
  const grassTexture = useTexture("/grass.png");
  
  // Configure texture repeat
  grassTexture.wrapS = grassTexture.wrapT = 1000; // RepeatWrapping
  grassTexture.repeat.set(4, 4);

  return (
    <group>
      {/* Arena floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>

      {/* Arena walls */}
      <mesh position={[0, 1, 8]} castShadow>
        <boxGeometry args={[16, 2, 0.5]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0, 1, -8]} castShadow>
        <boxGeometry args={[16, 2, 0.5]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[8, 1, 0]} castShadow>
        <boxGeometry args={[0.5, 2, 16]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[-8, 1, 0]} castShadow>
        <boxGeometry args={[0.5, 2, 16]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>

      {/* Corner decorations */}
      <mesh position={[6, 0.5, 6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-6, 0.5, 6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[6, 0.5, -6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[-6, 0.5, -6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}
