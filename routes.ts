import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Future multiplayer endpoints
  app.post('/api/game/join', (req, res) => {
    // TODO: Implement game room joining logic
    res.json({ message: 'Multiplayer not yet implemented' });
  });

  app.get('/api/game/stats', (req, res) => {
    // TODO: Implement game statistics
    res.json({ 
      totalGames: 0,
      totalPlayers: 0,
      activeGames: 0
    });
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time multiplayer (future implementation)
  // Use a separate port for WebSocket to avoid conflicts with Vite HMR
  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // TODO: Implement game message handling
        // - Player movement updates
        // - Combat actions
        // - Weapon pickups
        // - Game state synchronization
        
        ws.send(JSON.stringify({ 
          type: 'info', 
          message: 'Multiplayer not yet implemented' 
        }));
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    // Send welcome message
    ws.send(JSON.stringify({ 
      type: 'welcome', 
      message: 'Connected to Arena Fighter server' 
    }));
  });

  return httpServer;
}
