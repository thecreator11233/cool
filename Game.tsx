import { useEffect } from "react";
import { useFighting } from "../lib/stores/useFighting";
import { useAudio } from "../lib/stores/useAudio";
import Arena from "./Arena";
import Player from "./Player";
import Bot from "./Bot";
import WeaponSpawner from "./WeaponSpawner";

export default function Game() {
  const { initializeGame } = useFighting();
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize the game
    initializeGame();

    // Load audio files
    const bgMusic = new Audio("/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    const hitAudio = new Audio("/hit.mp3");
    hitAudio.volume = 0.5;
    setHitSound(hitAudio);

    const successAudio = new Audio("/success.mp3");
    successAudio.volume = 0.7;
    setSuccessSound(successAudio);

    return () => {
      bgMusic.pause();
    };
  }, [initializeGame, setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <>
      <Arena />
      <Player />
      <Bot />
      <WeaponSpawner />
    </>
  );
}
