# Overview

This is a 3D fighting game built with React Three Fiber, featuring real-time combat mechanics, weapon pickups, and AI opponent battles. Players engage in arena-based combat with various weapon types, competing in first-to-3-kills matches. The game includes a comprehensive UI system, sound effects, and preparation for future multiplayer functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React + TypeScript**: Component-based UI with type safety
- **React Three Fiber**: 3D rendering and game world management
- **Vite**: Development server and build tooling with HMR support
- **Tailwind CSS + Radix UI**: Styling system with accessible component library
- **Zustand**: State management for game logic, audio, and weapon systems

## Game Engine Design
- **3D Scene Management**: Canvas-based rendering with camera controls and lighting
- **Component System**: Modular game entities (Player, Bot, Arena, Weapons)
- **Input Handling**: Keyboard controls mapped through React Three Drei
- **Physics**: Basic collision detection and movement constraints
- **AI System**: State-machine based bot behavior (idle, chasing, attacking, weapon-seeking)

## State Management Pattern
- **Game State**: Fighting phases, scores, player/bot data managed via Zustand
- **Audio System**: Centralized sound management with mute controls
- **Weapon System**: Dynamic weapon spawning, pickup mechanics, and golden weapon variants
- **Reactive Updates**: State changes trigger UI and 3D scene updates automatically

## Backend Architecture
- **Express.js**: REST API server with middleware for logging and error handling
- **WebSocket Server**: Prepared infrastructure for future multiplayer features
- **In-Memory Storage**: User management with interface for future database integration
- **Development Integration**: Vite middleware for seamless development experience

## Asset Management
- **Texture Loading**: Optimized texture handling for arena environments
- **Audio Assets**: Background music, sound effects with volume controls
- **3D Models**: Support for GLTF/GLB model loading
- **Shader Support**: GLSL shader integration for enhanced visual effects

# External Dependencies

## Core Framework Dependencies
- **@react-three/fiber**: 3D scene rendering and React integration
- **@react-three/drei**: Helper components for cameras, controls, and loaders
- **@react-three/postprocessing**: Visual effects and post-processing pipeline

## UI Component Libraries  
- **@radix-ui/***: Comprehensive accessible UI component primitives
- **@tanstack/react-query**: Server state management and caching
- **class-variance-authority**: Type-safe component variant management
- **cmdk**: Command palette and search functionality

## Database & Storage
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **connect-pg-simple**: PostgreSQL session store for user sessions

## Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **Vite**: Fast development server with HMR and optimized builds  
- **ESBuild**: Fast JavaScript bundling for production builds
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing

## Audio & Media
- **Web Audio API**: Native browser audio handling for game sounds
- **HTML5 Audio**: Background music and sound effect playback

## Future Multiplayer Infrastructure
- **WebSocket (ws)**: Real-time communication for multiplayer features
- **HTTP Server**: RESTful API endpoints for game statistics and room management