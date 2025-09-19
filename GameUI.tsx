import { useFighting } from "../lib/stores/useFighting";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "../lib/ui/button";
import { Card, CardContent } from "../lib/ui/card";
import { Volume2, VolumeX } from "lucide-react";

export default function GameUI() {
  const { 
    gamePhase, 
    playerScore, 
    botScore, 
    resetGame,
    player,
    bot
  } = useFighting();
  const { isMuted, toggleMute } = useAudio();

  const isGameOver = gamePhase === 'match_end';
  const winner = playerScore >= 3 ? 'Player' : botScore >= 3 ? 'Bot' : null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top UI */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <Card className="bg-black bg-opacity-70 border-white border-opacity-30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-sm opacity-75">Player</div>
                <div className="text-2xl font-bold text-blue-400">{playerScore}</div>
              </div>
              <div className="text-xl font-bold">VS</div>
              <div className="text-center">
                <div className="text-sm opacity-75">Bot</div>
                <div className="text-2xl font-bold text-red-400">{botScore}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sound toggle */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <Button
          onClick={toggleMute}
          variant="outline"
          size="icon"
          className="bg-black bg-opacity-70 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <Card className="bg-black bg-opacity-70 border-white border-opacity-30">
          <CardContent className="p-3">
            <div className="text-white text-sm space-y-1">
              <div>WASD / Arrow Keys: Move</div>
              <div>E: Pick up weapon</div>
              <div>J/K/L/Space: Attack</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weapon info */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <Card className="bg-black bg-opacity-70 border-white border-opacity-30">
          <CardContent className="p-3">
            <div className="text-white text-sm">
              <div className="font-semibold">Player Weapon:</div>
              <div className={player?.weapon?.isGolden ? "text-yellow-400 font-bold" : ""}>
                {player?.weapon?.isGolden ? "✨ Golden " : ""}{player?.weapon?.type || 'Fists'}
              </div>
              {player?.weapon && (
                <div className="text-xs opacity-75">
                  Damage: {player.weapon.damage} | Range: {player.weapon.range.toFixed ? player.weapon.range.toFixed(1) : player.weapon.range}
                  {player.weapon.isGolden && (
                    <div className="text-yellow-400 text-xs font-semibold">
                      🌟 Enhanced Stats! (+50% damage, +30% range)
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center pointer-events-auto">
          <Card className="bg-black bg-opacity-90 border-white border-opacity-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {winner === 'Player' ? '🎉 You Won!' : '💀 You Lost!'}
              </h2>
              <div className="text-xl text-white mb-6">
                Final Score: {playerScore} - {botScore}
              </div>
              <Button
                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
