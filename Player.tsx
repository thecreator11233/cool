import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useFighting } from "@/lib/stores/useFighting";
import { useWeapons } from "@/lib/stores/useWeapons";
import * as THREE from "three";
import HealthBar from "./HealthBar";

export default function Player() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { player, updatePlayerPosition, playerAttack } = useFighting();
  const { weapons, pickupWeapon } = useWeapons();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!meshRef.current || !player) return;

    const keys = getKeys();
    const speed = 8;
    let moved = false;

    // Movement
    if (keys.forward) {
      player.position.z -= speed * delta;
      moved = true;
    }
    if (keys.backward) {
      player.position.z += speed * delta;
      moved = true;
    }
    if (keys.leftward) {
      player.position.x -= speed * delta;
      moved = true;
    }
    if (keys.rightward) {
      player.position.x += speed * delta;
      moved = true;
    }

    // Keep player in bounds (arena is 16x16)
    player.position.x = THREE.MathUtils.clamp(player.position.x, -7.5, 7.5);
    player.position.z = THREE.MathUtils.clamp(player.position.z, -7.5, 7.5);

    if (moved) {
      updatePlayerPosition(player.position);
    }

    // Update mesh position
    meshRef.current.position.copy(player.position);

    // Check for weapon pickup
    if (keys.pickup) {
      weapons.forEach((weapon) => {
        const distance = player.position.distanceTo(weapon.position);
        if (distance < 1.5 && !weapon.pickedUp) {
          pickupWeapon(weapon.id, 'player');
          console.log(`Player picked up ${weapon.type}`);
        }
      });
    }

    // Attack
    if (keys.punch || keys.kick || keys.special) {
      playerAttack();
    }
  });

  if (!player) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[player.position.x, player.position.y, player.position.z]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      <HealthBar 
        position={new THREE.Vector3(player.position.x, player.position.y + 2, player.position.z)}
        health={player.health}
        maxHealth={100}
        color="#4f46e5"
      />
    </group>
  );
}
