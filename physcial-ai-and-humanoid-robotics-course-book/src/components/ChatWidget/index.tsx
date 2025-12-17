import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  citations?: string[];
}

interface ChatResponse {
  response: string;
  citations?: string[];
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleSend = async () => {
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      setError('Please enter a message');
      return;
    }

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Send request to backend API
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Server error: ${response.status}`
        );
      }

      const data: ChatResponse = await response.json();

      // Add bot response to chat
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        citations: data.citations,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to connect to chat service';

      setError(errorMessage);

      // Add error message to chat
      const errorBotMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="chat-widget-fab"
        onClick={isOpen ? handleClose : handleOpen}
        title={isOpen ? 'Close chat' : 'Open chat'}
        aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-container">
          {/* Header */}
          <div className="chat-widget-header">
            <span>Ask Me Anything</span>
            <button
              className="chat-widget-close-btn"
              onClick={handleClose}
              aria-label="Close chat widget"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="chat-widget-messages">
            {messages.length === 0 ? (
              <div className="chat-empty-state">
                <div className="chat-empty-icon">🤖</div>
                <div className="chat-empty-text">
                  Hi! Ask me questions about the course material, and I'll help
                  you find the answers.
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender}`}>
                    <div>
                      <div className={`message-bubble ${msg.sender}`}>
                        {msg.content}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="chat-citations">
                            {msg.citations.map((citation, idx) => (
                              <span key={idx} className="citation-item">
                                {citation}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="message-timestamp">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat-message bot">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error Message */}
          {error && !isLoading && (
            <div className="message-error">{error}</div>
          )}

          {/* Input Area */}
          <div className="chat-widget-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={inputValue}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              aria-label="Chat message input"
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
