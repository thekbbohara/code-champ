# Technical Architecture

## Stack
- Frontend: Next.js 14 (App Router)
- Backend: Express.js
- Database: PostgreSQL + Prisma
- WebSocket: Socket.io
- Authentication: NextAuth.js
- Code Execution: Isolated Docker containers
- Validation: Zod
- Real-time Editor: Monaco Editor with Vim support

## Core Services

### Authentication Service
- JWT-based auth flow
- Social auth integration
- Session management

### Room Service
- Room creation/joining logic
- Challenge configuration
- Participant management
- Ready-state handling

### Challenge Service
- Integration with Gemini API
- Test case generation
- Previous challenge tracking
- Difficulty management

### Code Execution Service
- Docker container management
- Test case validation
- Real-time execution
- Security sandbox

### Payment Service
- Token purchase system
- Redemption system
- Wallet management

### Real-time Service
- User status updates
- Game state management
- Global chat
- Editor synchronization


## Security Measures
- Rate limiting
- XSS prevention
- CSRF protection
- Input sanitization
- Secure websocket connections
- Anti-cheat measures:
  - Tab focus detection
  - Clipboard restrictions
  - Editor sandboxing

## Deployment Architecture
- Frontend: Vercel
- Backend: Dedicated server
- Code Execution: Kubernetes cluster
- Database: Managed PostgreSQL
- WebSocket: Dedicated server
- Redis for caching

## API Routes Structure

### Auth Routes
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Room Routes
```
POST /api/rooms
GET  /api/rooms
POST /api/rooms/:id/join
POST /api/rooms/:id/ready
POST /api/rooms/:id/start
```

### Challenge Routes
```
POST /api/challenges/:id/submit
GET  /api/challenges/:id/status
GET  /api/challenges
```

### Payment Routes
```
POST /api/tokens/purchase
POST /api/tokens/redeem
GET  /api/tokens/balance
```

### User Routes
```
GET  /api/users/leaderboard
PUT  /api/users/preferences
GET  /api/users/history
```
