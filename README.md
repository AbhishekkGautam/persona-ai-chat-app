# Mentor Ji

A modern AI chat application to have casual conversations with your favorite Indian tech educators - Hitesh Choudhary and Piyush Garg.

## ✨ Features

- 🤖 **AI-Powered Personas** - Authentic conversations with Hitesh Choudhary and Piyush Garg
- 💬 **Categorized Conversation Starters** - Tech, Career, Casual, and Personal topics with curated questions
- 🎨 **Modern UI/UX** - Clean design with dark/light theme and glass-morphism effects
- 📱 **Fully Responsive** - Mobile-first design with adaptive layouts
- 🌍 **Bilingual Support** - Natural Hindi & English (Hinglish) conversations
- 🏷️ **Smart Filtering** - Category-based question filters with elegant chip design
- ⚡ **Real-time Chat** - Smooth message flow with typing indicators and auto-scroll
- 🎯 **Context Awareness** - Maintains conversation history throughout the chat

## 🚀 Quick Start

```bash
# Clone and install
git clone git@github.com:AbhishekkGautam/persona-ai-chat-app.git
cd persona-ai-chat-app
npm install

# Configure environment
cp .env.local
# Add your OpenAI API key to .env.local

# Start development server
npm run dev
```

## ⚙️ Environment Setup

Create a `.env.local` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion (subtle, performance-optimized)
- **AI Integration**: OpenAI SDK with GPT-4o-mini
- **Routing**: React Router v6
- **State Management**: React Hooks + Context
- **Build Tool**: Vite (fast HMR and optimized builds)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── PersonaCard.tsx  # Landing page persona cards
│   └── theme-*.tsx      # Theme management components
├── pages/               # Application pages
│   ├── Index.tsx        # Landing page with persona selection
│   ├── Chat.tsx         # Main chat interface
│   └── NotFound.tsx     # 404 error page
├── services/            # API services and business logic
│   └── chatService.ts   # OpenAI integration (functional style)
├── config/              # Configuration files
│   ├── personas.ts      # Persona definitions and conversation starters
│   └── openai.ts        # OpenAI client configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── main.tsx            # Application entry point
```

## 📈 Roadmap

Coming soon...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Hitesh Choudhary** - For inspiring developers worldwide
- **Piyush Garg** - For democratizing tech education
- **OpenAI** - For powerful AI capabilities
- **shadcn** - For beautiful UI components

---

Built with ❤️ by [@helloAbhishekk](https://twitter.com/helloAbhishekk)
