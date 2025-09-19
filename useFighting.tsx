import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";
import { Fighter, WeaponType } from "@/lib/gameTypes";
import { useAudio } from "./useAudio";

export type GamePhase = "menu" | "fighting" | "round_end" | "match_end";

interface FightingState {
  gamePhase: GamePhase;
  player: Fighter | null;
  bot: Fighter | null;
  playerScore: number;
  botScore: number;
  
  // Actions
  startGame: () => void;
  initializeGame: () => void;
  resetGame: () => void;
  updatePlayerPosition: (position: THREE.Vector3) => void;
  updateBotPosition: (position: THREE.Vector3) => void;
  playerAttack: () => void;
  botAttack: () => void;
  takeDamage: (target: 'player' | 'bot', damage: number) => void;
}

export const useFighting = create<FightingState>()(
  subscribeWithSelector((set, get) => ({
    gamePhase: "menu",
    player: null,
    bot: null,
    playerScore: 0,
    botScore: 0,
    
    startGame: () => {
      set({ gamePhase: "fighting" });
    },
    
    initializeGame: () => {
      const player: Fighter = {
        id: "player",
        position: new THREE.Vector3(-3, 1, 0),
        health: 100,
        maxHealth: 100,
        weapon: null,
        isAlive: true,
      };
      
      const bot: Fighter = {
        id: "bot",
        position: new THREE.Vector3(3, 1, 0),
        health: 100,
        maxHealth: 100,
        weapon: null,
        isAlive: true,
      };
      
      set({ player, bot });
    },
    
    resetGame: () => {
      const state = get();
      
      // Reset fighters
      if (state.player) {
        state.player.position.set(-3, 1, 0);
        state.player.health = 100;
        state.player.weapon = null;
        state.player.isAlive = true;
      }
      
      if (state.bot) {
        state.bot.position.set(3, 1, 0);
        state.bot.health = 100;
        state.bot.weapon = null;
        state.bot.isAlive = true;
      }
      
      set({ 
        gamePhase: "fighting",
        playerScore: 0,
        botScore: 0,
      });
    },
    
    updatePlayerPosition: (position: THREE.Vector3) => {
      set((state) => {
        if (state.player) {
          state.player.position.copy(position);
        }
        return {};
      });
    },
    
    updateBotPosition: (position: THREE.Vector3) => {
      set((state) => {
        if (state.bot) {
          state.bot.position.copy(position);
        }
        return {};
      });
    },
    
    playerAttack: () => {
      const state = get();
      if (!state.player || !state.bot || !state.player.isAlive) return;
      
      const distance = state.player.position.distanceTo(state.bot.position);
      const weapon = state.player.weapon;
      const range = weapon ? weapon.range : 2; // Default melee range
      
      if (distance <= range) {
        const damage = weapon ? weapon.damage : 15; // Default punch damage
        get().takeDamage('bot', damage);
        
        // Play hit sound
        const { playHit } = useAudio.getState();
        playHit();
        
        console.log(`Player attacked for ${damage} damage`);
      }
    },
    
    botAttack: () => {
      const state = get();
      if (!state.bot || !state.player || !state.bot.isAlive) return;
      
      const distance = state.bot.position.distanceTo(state.player.position);
      const weapon = state.bot.weapon;
      const range = weapon ? weapon.range : 2; // Default melee range
      
      if (distance <= range) {
        const damage = weapon ? weapon.damage : 15; // Default punch damage
        get().takeDamage('player', damage);
        
        // Play hit sound
        const { playHit } = useAudio.getState();
        playHit();
        
        console.log(`Bot attacked for ${damage} damage`);
      }
    },
    
    takeDamage: (target: 'player' | 'bot', damage: number) => {
      set((state) => {
        const fighter = target === 'player' ? state.player : state.bot;
        if (!fighter || !fighter.isAlive) return {};
        
        fighter.health = Math.max(0, fighter.health - damage);
        
        if (fighter.health <= 0) {
          fighter.isAlive = false;
          
          // Update score
          const newPlayerScore = target === 'bot' ? state.playerScore + 1 : state.playerScore;
          const newBotScore = target === 'player' ? state.botScore + 1 : state.botScore;
          
          // Check for game end
          if (newPlayerScore >= 3 || newBotScore >= 3) {
            // Play success sound for winner
            const { playSuccess } = useAudio.getState();
            playSuccess();
            
            return {
              gamePhase: "match_end",
              playerScore: newPlayerScore,
              botScore: newBotScore,
            };
          } else {
            // Reset round
            setTimeout(() => {
              const currentState = get();
              if (currentState.player) {
                currentState.player.position.set(-3, 1, 0);
                currentState.player.health = 100;
                currentState.player.weapon = null;
                currentState.player.isAlive = true;
              }
              
              if (currentState.bot) {
                currentState.bot.position.set(3, 1, 0);
                currentState.bot.health = 100;
                currentState.bot.weapon = null;
                currentState.bot.isAlive = true;
              }
              
              set({ gamePhase: "fighting" });
            }, 2000);
            
            return {
              gamePhase: "round_end",
              playerScore: newPlayerScore,
              botScore: newBotScore,
            };
          }
        }
        
        return {};
      });
    },
  }))
);
