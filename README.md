# Anomaly Machina

Anomaly Machina is a Sci-Fi themed AI storytelling web application. It features a React + TypeScript frontend and a Flask backend powered by OpenAI's API, designed to act as a creative Dungeon Master for interactive storytelling.

## Features

- **Frontend**: Modern React app styled with Tailwind CSS, providing a chat interface for user prompts and AI responses.
- **Backend**: Flask API with endpoints for:
  - `/api/test`: Health check
  - `/api/roll/<dice_type>`: Dice rolling (e.g., d20)
  - `/api/prompt`: Sends user prompts to OpenAI and returns AI-generated story content
- **AI Integration**: Uses OpenAI's chat completions for dynamic, engaging story generation.
- **CORS**: Configured for local development between frontend and backend.

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.x
- OpenAI API key (add to `.env` in `backend/`)

### Installation

#### Backend

```bash
cd backend
pip install flask flask-cors python-dotenv openai
# Add your OpenAI API key to .env
python app.py
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Usage

- Start the backend server (`python app.py`)
- Start the frontend (`npm run dev`)
- Open the app in your browser (default: `http://localhost:5173`)
- Interact with the AI storyteller via the chat interface

## Project Structure

- `backend/app.py`: Flask API server
- `frontend/src/App.tsx`: Main React app/chat UI
- `frontend/package.json`: Frontend dependencies and scripts

## License

MIT
