// frontend/src/App.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';

// Define a type for our message objects for type safety
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

function App() {
  // State hooks with TypeScript types
  const [conversation, setConversation] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setConversation(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
  const response = await fetch('http://127.0.0.1:5000/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) throw new Error('API call failed.');
      
      const data = await response.json();
      const aiMessage: Message = { sender: 'ai', text: data.response };
      setConversation(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Failed to fetch from backend:", error);
      const errorMessage: Message = { sender: 'ai', text: 'Error: Could not connect to the anomaly. Please try again.' };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="p-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-purple-400">Anomaly Machina</h1>
        <p className="text-sm text-gray-400">Your Sci-Fi AI Storyteller</p>
      </header>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p className={`max-w-lg md:max-w-xl p-3 rounded-2xl whitespace-pre-wrap ${
              message.sender === 'user' 
                ? 'bg-purple-600 text-white rounded-br-lg' 
                : 'bg-gray-700 text-gray-200 rounded-bl-lg'
            }`}>
              {message.text}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <p className="max-w-lg p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-lg">
              <span className="animate-pulse">Accessing databanks...</span>
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-4 border-t border-gray-700">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Transmit your next action..."
          disabled={isLoading}
          className="flex-grow p-3 bg-gray-800 text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="ml-3 px-6 py-3 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;