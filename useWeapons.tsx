import { create } from "zustand";
import * as THREE from "three";
import { WeaponInstance, WeaponType } from "../gameTypes";
import { weaponTypes, getWeaponStats } from "../weapons";
import { useFighting } from "./useFighting";

interface WeaponState {
  weapons: WeaponInstance[];
  
  // Actions
  spawnRandomWeapon: () => void;
  pickupWeapon: (weaponId: string, fighterId: 'player' | 'bot') => void;
  initializeSpawner: () => void;
}

export const useWeapons = create<WeaponState>()((set, get) => ({
  weapons: [],
  
  initializeSpawner: () => {
    set({ weapons: [] });
  },
  
  spawnRandomWeapon: () => {
    const weaponTypeKeys = Object.keys(weaponTypes) as (keyof typeof weaponTypes)[];
    const randomType = weaponTypeKeys[Math.floor(Math.random() * weaponTypeKeys.length)];
    
    // 5% chance for golden weapon
    const isGolden = Math.random() < 0.05;
    const weaponStats = getWeaponStats(randomType, isGolden);
    
    // Random position within arena bounds
    const x = (Math.random() - 0.5) * 14; // -7 to 7
    const z = (Math.random() - 0.5) * 14; // -7 to 7
    
    const weapon: WeaponInstance = {
      id: `weapon_${Date.now()}_${Math.random()}`,
      type: randomType,
      category: weaponStats.category,
      damage: weaponStats.damage,
      range: weaponStats.range,
      position: new THREE.Vector3(x, 0.5, z),
      pickedUp: false,
      isGolden: isGolden,
    };
    
    set((state) => ({
      weapons: [...state.weapons, weapon]
    }));
    
    console.log(`Spawned ${isGolden ? 'GOLDEN ' : ''}${randomType} at position (${x.toFixed(1)}, ${z.toFixed(1)})${isGolden ? ` with buffed stats: ${weaponStats.damage} damage, ${weaponStats.range.toFixed(1)} range` : ''}`);
  },
  
  pickupWeapon: (weaponId: string, fighterId: 'player' | 'bot') => {
    const state = get();
    const weapon = state.weapons.find(w => w.id === weaponId);
    
    if (!weapon || weapon.pickedUp) return;
    
    // Mark weapon as picked up
    set((state) => ({
      weapons: state.weapons.map(w => 
        w.id === weaponId ? { ...w, pickedUp: true } : w
      )
    }));
    
    // Give weapon to fighter using proper setState to trigger subscribers
    const newWeapon = {
      type: weapon.type,
      category: weapon.category,
      damage: weapon.damage,
      range: weapon.range,
      isGolden: weapon.isGolden,
    };
    
    if (fighterId === 'player') {
      useFighting.setState((state) => ({
        player: state.player ? { ...state.player, weapon: newWeapon } : state.player
      }));
    } else {
      useFighting.setState((state) => ({
        bot: state.bot ? { ...state.bot, weapon: newWeapon } : state.bot
      }));
    }
    
    console.log(`${fighterId} picked up ${weapon.isGolden ? 'GOLDEN ' : ''}${weapon.type} - Damage: ${weapon.damage}, Range: ${weapon.range.toFixed(1)}${weapon.isGolden ? ' (ENHANCED)' : ''}`);
    
    // Remove weapon after a delay to allow for animation
    setTimeout(() => {
      set((state) => ({
        weapons: state.weapons.filter(w => w.id !== weaponId)
      }));
    }, 1000);
  },
}));
