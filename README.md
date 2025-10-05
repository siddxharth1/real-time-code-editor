# Real-Time Code Editor

A collaborative real-time code editor that enables multiple users to code together simultaneously.

## ✨ Features

- **Real-time Collaboration**: Multi-user editing with live cursor tracking
- **Multi-language Support**: Syntax highlighting for various programming languages
- **Code Execution**: Run and test code directly in the browser
- **Integrated Chat**: Built-in team communication
- **Drawing Board**: Collaborative whiteboard for brainstorming
- **Room-based Sessions**: Create/join coding rooms with unique IDs
- **User Presence**: See who's online and active
- **Modern UI**: Responsive interface with NextUI and Tailwind CSS

## 🛠️ Tech Stack

**Frontend**: React 18, Vite, Socket.IO Client, Monaco Editor, NextUI, Tailwind CSS, Framer Motion, React Router, Excalidraw

**Backend**: Node.js, Express.js, Socket.IO, Redis, Redis Streams Adapter

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Redis** - [Installation Guide](https://redis.io/docs/getting-started/installation/)
- **Git** - Version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/siddxharth1/real-time-code-editor.git
cd real-time-code-editor
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Configure Backend Environment Variables
```env
PORT=3000
REDIS_URL="redis://default:your_redis_password@localhost:6379"
```

**Note**: Update the Redis URL with your actual Redis configuration. If you're running Redis locally without authentication, you can use:

```env
REDIS_URL="redis://localhost:6379"
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Configure Frontend Environment Variables

Edit the `.env` file in the frontend directory:

```env
VITE_BACKEND_URL="http://localhost:3000"
```

### 4. Redis Setup

#### Option A: Local Redis Installation

**On Windows:**

1. Download Redis from [Redis Windows releases](https://github.com/microsoftarchive/redis/releases)
2. Install and start the Redis server
3. Default runs on `localhost:6379`

**On macOS:**

```bash
# Using Homebrew
brew install redis
brew services start redis
```

**On Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

#### Option B: Docker Redis

```bash
# Run Redis in Docker
docker run -d --name redis-server -p 6379:6379 redis:latest

# Or with authentication
docker run -d --name redis-server -p 6379:6379 redis:latest redis-server --requirepass yourpassword
```

#### Option C: Cloud Redis (Recommended)

- **Redis Cloud** (free tier available) https://redis.io/try-free/

## 🏃‍♂️ Running the Application

### Development Mode

#### 1. Start Redis

Make sure Redis is running.

#### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3000`

#### 3. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 🎯 Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

2. **Create a Room**:

   - Click on "Create Room" to generate a new coding session
   - Share the room ID with your collaborators

3. **Join a Room**:

   - Enter an existing room ID to join a collaborative session
   - Provide your username to identify yourself

4. **Start Coding**:
   - Select your preferred programming language
   - Start coding with real-time collaboration
   - Use the integrated chat for communication
   - Access the drawing board for brainstorming

## 🤝 Contributing

We welcome contributions! Please follow these steps:

If you’re new here, please start with our full guide in `CONTRIBUTING.md` for branch naming, commit conventions, and the PR process.

## 🌟 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor component
- [Socket.IO](https://socket.io/) - Real-time communication
- [NextUI](https://nextui.org/) - Modern React UI library
- [Excalidraw](https://excalidraw.com/) - Collaborative drawing tool
- [Redis](https://redis.io/) - In-memory data store

---

**Happy Coding! 🚀**
