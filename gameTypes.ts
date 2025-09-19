import * as THREE from "three";

export interface WeaponType {
  category: 'melee' | 'ranged' | 'throwable';
  damage: number;
  range: number;
  isGolden?: boolean;
}

export interface WeaponInstance {
  id: string;
  type: string;
  category: 'melee' | 'ranged' | 'throwable';
  damage: number;
  range: number;
  position: THREE.Vector3;
  pickedUp: boolean;
  isGolden: boolean;
}

export interface Fighter {
  id: string;
  position: THREE.Vector3;
  health: number;
  maxHealth: number;
  weapon: WeaponType & { type: string; isGolden?: boolean } | null;
  isAlive: boolean;
}
