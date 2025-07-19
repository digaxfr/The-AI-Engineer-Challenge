'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Settings, Key } from 'lucide-react'
import AILogo from './components/AILogo'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatRequest {
  developer_message: string
  user_message: string
  model: string
  api_key: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [developerMessage, setDeveloperMessage] = useState('You are a helpful AI assistant.')
  const [model, setModel] = useState('gpt-4.1-mini')
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !apiKey.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const request: ChatRequest = {
        developer_message: developerMessage,
        user_message: input,
        model: model,
        api_key: apiKey
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      let assistantMessage = ''
      const assistantMessageObj: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessageObj])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        assistantMessage += chunk

        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage.role === 'assistant') {
            lastMessage.content = assistantMessage
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please check your API key and try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 90s-style marquee header */}
        <div className="mb-6">
          <div className="marquee bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
            <span className="text-lg">🌟 Welcome to the AI Engineer Challenge! 🌟 Chat with GPT-4.1-mini! 🌟</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 geocities-border rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <AILogo size={100} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{textShadow: '2px 2px 4px #ff6b6b'}}>
            AI Engineer Challenge
          </h1>
          <p className="text-yellow-300 font-semibold">
            Chat with GPT-4.1-mini using the FastAPI backend
          </p>
        </div>

        {/* Settings Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="retro-button flex items-center gap-2 px-4 py-2 text-white rounded-lg font-bold"
          >
            <Settings size={20} />
            Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-6 geocities-border rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4" style={{textShadow: '1px 1px 2px #ff6b6b'}}>Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  OpenAI API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API key"
                    className="retro-input w-full px-4 py-2 rounded-lg text-white placeholder-yellow-200 focus:outline-none"
                  />
                  <Key className="absolute right-3 top-2.5 h-5 w-5 text-yellow-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Developer Message (System Prompt)
                </label>
                <textarea
                  value={developerMessage}
                  onChange={(e) => setDeveloperMessage(e.target.value)}
                  placeholder="Enter the system prompt for the AI"
                  rows={3}
                  className="retro-input w-full px-4 py-2 rounded-lg text-white placeholder-yellow-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="retro-input w-full px-4 py-2 rounded-lg text-white focus:outline-none"
                >
                  <option value="gpt-4.1-mini">GPT-4.1-mini</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5-turbo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="geocities-border rounded-lg h-96 overflow-y-auto mb-6">
          <div className="p-6">
            {messages.length === 0 ? (
              <div className="text-center text-yellow-300 py-8">
                <AILogo size={80} className="mx-auto mb-4" />
                <p className="font-semibold">Start a conversation by typing a message below</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User size={16} />
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        }`}
                        style={{boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-300"></div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading || !apiKey.trim()}
            className="retro-input flex-1 px-4 py-3 rounded-lg text-white placeholder-yellow-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !apiKey.trim()}
            className="retro-button px-6 py-3 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold flex items-center gap-2"
          >
            <Send size={20} />
            Send
          </button>
        </form>

        {!apiKey.trim() && (
          <div className="mt-4 p-4 geocities-border rounded-lg">
            <p className="text-yellow-300 text-sm font-semibold">
              ⚠️ Please enter your OpenAI API key in the settings to start chatting.
            </p>
          </div>
        )}

        {/* 90s-style footer */}
        <div className="mt-8 text-center">
          <div className="marquee bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg">
            <span>🚀 Built with Next.js & FastAPI 🚀 Deploy on Vercel! 🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
} 