# AI Engineer Challenge Frontend

A modern, responsive chat interface built with Next.js for the AI Engineer Challenge. This frontend integrates with the FastAPI backend to provide a seamless chat experience with GPT models.

## Features

- 🎨 **Dark Theme**: Beautiful dark mode interface with orange accent colors
- 💬 **Real-time Chat**: Stream responses from the AI as they're generated
- ⚙️ **Configurable Settings**: Customize API key, system prompt, and model selection
- 🔒 **Secure**: Password-style input for API keys
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🚀 **Fast**: Built with Next.js for optimal performance

## Prerequisites

- Node.js 18+ installed
- The FastAPI backend running on `http://localhost:8000`

## Quick Start

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to `http://localhost:3000`

4. **Configure Settings**
   - Click the "Settings" button
   - Enter your OpenAI API key
   - Customize the system prompt if desired
   - Select your preferred model

5. **Start Chatting**
   Type your message and press Enter or click Send!

## Development

### Project Structure
```
frontend/
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main chat interface
├── package.json         # Dependencies and scripts
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── postcss.config.js    # PostCSS configuration
```

### Key Features Explained

#### Real-time Streaming
The frontend uses the Fetch API's streaming capabilities to display AI responses as they're generated, providing a smooth chat experience.

#### Settings Management
- **API Key**: Securely stored in component state (not persisted)
- **System Prompt**: Customizable developer message for AI behavior
- **Model Selection**: Choose between different GPT models

#### Responsive Design
- Mobile-first approach with Tailwind CSS
- Flexible layout that adapts to different screen sizes
- Touch-friendly interface elements

#### Error Handling
- Graceful error handling for API failures
- User-friendly error messages
- Loading states for better UX

## Deployment

This frontend is designed to be deployed on Vercel. The `next.config.js` includes API proxy configuration for local development.

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables
For production, you may want to configure environment variables for API endpoints.

## Backend Integration

The frontend communicates with the FastAPI backend through:
- **POST** `/api/chat` - Send chat messages and receive streaming responses
- **GET** `/api/health` - Health check endpoint

The backend expects requests in this format:
```json
{
  "developer_message": "System prompt",
  "user_message": "User input",
  "model": "gpt-4.1-mini",
  "api_key": "your-openai-api-key"
}
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hooks**: State management and side effects

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the AI Engineer Challenge.