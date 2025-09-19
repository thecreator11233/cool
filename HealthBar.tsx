import { Html } from "@react-three/drei";
import * as THREE from "three";

interface HealthBarProps {
  position: THREE.Vector3;
  health: number;
  maxHealth: number;
  color: string;
}

export default function HealthBar({ position, health, maxHealth, color }: HealthBarProps) {
  const healthPercentage = Math.max(0, health / maxHealth);

  return (
    <Html position={[position.x, position.y, position.z]} center>
      <div className="flex flex-col items-center">
        <div className="w-16 h-2 bg-black bg-opacity-50 rounded-full overflow-hidden border border-white">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${healthPercentage * 100}%`,
              backgroundColor: health > 60 ? '#10b981' : health > 30 ? '#f59e0b' : '#ef4444'
            }}
          />
        </div>
        <div className="text-xs text-white font-bold mt-1 bg-black bg-opacity-50 px-1 rounded">
          {Math.ceil(health)}/{maxHealth}
        </div>
      </div>
    </Html>
  );
}
