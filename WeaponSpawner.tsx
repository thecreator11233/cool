import { useEffect } from "react";
import { useWeapons } from "../lib/stores/useWeapons";
import Weapon from "./Weapon";

export default function WeaponSpawner() {
  const { weapons, spawnRandomWeapon, initializeSpawner } = useWeapons();

  useEffect(() => {
    initializeSpawner();
    
    // Spawn initial weapons
    setTimeout(() => spawnRandomWeapon(), 1000);
    setTimeout(() => spawnRandomWeapon(), 3000);

    // Set up periodic spawning
    const interval = setInterval(() => {
      const currentWeapons = useWeapons.getState().weapons;
      if (currentWeapons.filter(w => !w.pickedUp).length < 3) {
        spawnRandomWeapon();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []); // Remove the dependencies to prevent infinite loop

  return (
    <>
      {weapons.map((weapon) => (
        <Weapon key={weapon.id} weapon={weapon} />
      ))}
    </>
  );
}
