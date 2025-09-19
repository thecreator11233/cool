import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WeaponInstance } from "@/lib/gameTypes";

interface WeaponProps {
  weapon: WeaponInstance;
}

export default function Weapon({ weapon }: WeaponProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || weapon.pickedUp) return;
    
    // Gentle floating animation
    meshRef.current.position.y = weapon.position.y + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.rotation.y += 0.01;
  });

  if (weapon.pickedUp) return null;

  // Different geometries based on weapon type
  const getWeaponGeometry = () => {
    switch (weapon.category) {
      case 'melee':
        return <boxGeometry args={[0.2, 1.5, 0.2]} />;
      case 'ranged':
        return <boxGeometry args={[1, 0.3, 0.3]} />;
      case 'throwable':
        return <sphereGeometry args={[0.3]} />;
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  };

  const getWeaponColor = () => {
    // Golden weapons get a special golden color
    if (weapon.isGolden) {
      return "#fbbf24"; // Golden yellow
    }
    
    switch (weapon.category) {
      case 'melee':
        return "#94a3b8";
      case 'ranged':
        return "#1f2937";
      case 'throwable':
        return "#7c3aed";
      default:
        return "#6b7280";
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[weapon.position.x, weapon.position.y, weapon.position.z]}
      castShadow
    >
      {getWeaponGeometry()}
      <meshStandardMaterial 
        color={getWeaponColor()} 
        emissive={weapon.isGolden ? "#fbbf24" : "#000000"}
        emissiveIntensity={weapon.isGolden ? 0.2 : 0}
        metalness={weapon.isGolden ? 0.8 : 0.3}
        roughness={weapon.isGolden ? 0.1 : 0.7}
      />
    </mesh>
  );
}
