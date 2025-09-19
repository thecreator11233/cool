import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useFighting } from "@/lib/stores/useFighting";
import { useWeapons } from "@/lib/stores/useWeapons";
import * as THREE from "three";
import HealthBar from "./HealthBar";

export default function Bot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { bot, player, updateBotPosition, botAttack } = useFighting();
  const { weapons, pickupWeapon } = useWeapons();
  const [aiState, setAiState] = useState<'idle' | 'chasing' | 'attacking' | 'seeking_weapon'>('idle');
  const [lastActionTime, setLastActionTime] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current || !bot || !player) return;

    const currentTime = state.clock.elapsedTime;
    
    // Simple AI behavior
    const distanceToPlayer = bot.position.distanceTo(player.position);
    const nearbyWeapons = weapons.filter(w => 
      !w.pickedUp && bot.position.distanceTo(w.position) < 5
    );

    let newState = aiState;
    const speed = 6;

    // Decision making
    if (!bot.weapon && nearbyWeapons.length > 0) {
      newState = 'seeking_weapon';
    } else if (distanceToPlayer < 2) {
      newState = 'attacking';
    } else if (distanceToPlayer < 8) {
      newState = 'chasing';
    } else {
      newState = 'idle';
    }

    if (newState !== aiState) {
      setAiState(newState);
    }

    // Execute behavior
    switch (aiState) {
      case 'seeking_weapon':
        if (nearbyWeapons.length > 0) {
          const targetWeapon = nearbyWeapons[0];
          const direction = new THREE.Vector3()
            .subVectors(targetWeapon.position, bot.position)
            .normalize();
          
          bot.position.add(direction.multiplyScalar(speed * delta));
          
          // Check if close enough to pick up
          if (bot.position.distanceTo(targetWeapon.position) < 1.5) {
            pickupWeapon(targetWeapon.id, 'bot');
            console.log(`Bot picked up ${targetWeapon.type}`);
          }
        }
        break;

      case 'chasing':
        const chaseDirection = new THREE.Vector3()
          .subVectors(player.position, bot.position)
          .normalize();
        bot.position.add(chaseDirection.multiplyScalar(speed * delta));
        break;

      case 'attacking':
        if (currentTime - lastActionTime > 1.5) {
          botAttack();
          setLastActionTime(currentTime);
        }
        break;

      case 'idle':
        // Random movement
        if (currentTime - lastActionTime > 2) {
          const randomDirection = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            0,
            (Math.random() - 0.5) * 2
          ).normalize();
          bot.position.add(randomDirection.multiplyScalar(speed * delta * 0.3));
          setLastActionTime(currentTime);
        }
        break;
    }

    // Keep bot in bounds
    bot.position.x = THREE.MathUtils.clamp(bot.position.x, -7.5, 7.5);
    bot.position.z = THREE.MathUtils.clamp(bot.position.z, -7.5, 7.5);

    updateBotPosition(bot.position);

    // Update mesh position
    meshRef.current.position.copy(bot.position);
  });

  if (!bot) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[bot.position.x, bot.position.y, bot.position.z]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <HealthBar 
        position={new THREE.Vector3(bot.position.x, bot.position.y + 2, bot.position.z)}
        health={bot.health}
        maxHealth={100}
        color="#ef4444"
      />
    </group>
  );
}
