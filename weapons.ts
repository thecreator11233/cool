import { WeaponType } from "./gameTypes";

// Create golden version of a weapon with enhanced stats
export function createGoldenWeapon(baseWeapon: WeaponType): WeaponType {
  return {
    ...baseWeapon,
    damage: Math.round(baseWeapon.damage * 1.5), // 50% more damage
    range: baseWeapon.range * 1.3, // 30% more range
    isGolden: true,
  };
}

// Get weapon stats (golden or regular)
export function getWeaponStats(weaponType: string, isGolden: boolean): WeaponType {
  const baseWeapon = weaponTypes[weaponType];
  if (!baseWeapon) return { category: 'melee', damage: 15, range: 2 };
  
  return isGolden ? createGoldenWeapon(baseWeapon) : baseWeapon;
}

export const weaponTypes: Record<string, WeaponType> = {
  // Melee Weapons
  sword: {
    category: 'melee',
    damage: 35,
    range: 3,
  },
  axe: {
    category: 'melee',
    damage: 40,
    range: 2.5,
  },
  spear: {
    category: 'melee',
    damage: 30,
    range: 4,
  },
  club: {
    category: 'melee',
    damage: 25,
    range: 2,
  },
  dagger: {
    category: 'melee',
    damage: 20,
    range: 1.5,
  },
  
  // Ranged Weapons
  pistol: {
    category: 'ranged',
    damage: 30,
    range: 8,
  },
  rifle: {
    category: 'ranged',
    damage: 45,
    range: 12,
  },
  shotgun: {
    category: 'ranged',
    damage: 50,
    range: 5,
  },
  bow: {
    category: 'ranged',
    damage: 35,
    range: 10,
  },
  crossbow: {
    category: 'ranged',
    damage: 40,
    range: 9,
  },
  
  // Throwable Weapons
  grenade: {
    category: 'throwable',
    damage: 60,
    range: 6,
  },
  knife: {
    category: 'throwable',
    damage: 25,
    range: 7,
  },
  rock: {
    category: 'throwable',
    damage: 15,
    range: 5,
  },
  shuriken: {
    category: 'throwable',
    damage: 20,
    range: 8,
  },
  javelin: {
    category: 'throwable',
    damage: 35,
    range: 9,
  },
};
