import { useFighting } from "../lib/stores/useFighting";
import { Button } from "../lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../lib/ui/card";

export default function Menu() {
  const { startGame } = useFighting();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Card className="w-full max-w-md mx-4 bg-black bg-opacity-70 border-white border-opacity-30">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-white mb-2">
            ⚔️ Arena Fighter
          </CardTitle>
          <p className="text-gray-300">
            2D Fighting Game with Weapon Drops
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-white space-y-2">
            <h3 className="text-lg font-semibold">How to Play:</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Move with WASD or Arrow Keys</div>
              <div>• Press E to pick up weapons</div>
              <div>• Attack with J, K, L, or Space</div>
              <div>• First to 3 kills wins!</div>
            </div>
          </div>
          
          <Button
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
          >
            Start Game vs Bot
          </Button>
          
          <div className="text-center text-sm text-gray-400">
            Multiplayer coming soon!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
