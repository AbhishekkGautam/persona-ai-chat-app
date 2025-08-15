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
VITE_OPENAI_MODEL=your_preferred_model
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

## Chats
<img width="874" height="852" alt="Screenshot 2025-08-14 at 10 48 38 PM" src="https://github.com/user-attachments/assets/7a1240b3-0267-41be-8484-7b8ed330aa4d" />
<img width="856" height="515" alt="Screenshot 2025-08-15 at 5 55 15 AM" src="https://github.com/user-attachments/assets/3543e31f-6d4c-42ef-9985-d1fe26da11c2" />
<img width="833" height="773" alt="Screenshot 2025-08-15 at 5 35 39 AM" src="https://github.com/user-attachments/assets/ef389503-5433-4d9f-8672-cef7bc7a4637" />
<img width="849" height="499" alt="Screenshot 2025-08-15 at 4 58 40 AM" src="https://github.com/user-attachments/assets/03c7e057-44c4-4bc5-8646-1f0edd5082de" />
<img width="810" height="753" alt="Screenshot 2025-08-15 at 5 37 15 AM" src="https://github.com/user-attachments/assets/2c07d58f-64b4-4386-9778-88f33fedd9bd" />
<img width="869" height="992" alt="Screenshot 2025-08-15 at 4 31 28 AM" src="https://github.com/user-attachments/assets/92b7cff1-c619-46ad-a7f1-ebfb1e0eacda" />
<img width="846" height="991" alt="Screenshot 2025-08-15 at 5 47 45 AM" src="https://github.com/user-attachments/assets/c3edbac4-c85a-4f74-82f8-3cfdc29b15cc" />


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

---

Built with ❤️ by [@helloAbhishekk](https://twitter.com/helloAbhishekk)
