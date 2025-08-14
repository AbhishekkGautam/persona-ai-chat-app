# Chai & Code - Chat with Hitesh & Piyush

A casual chat app for having tea-time conversations with your favorite Indian tech educators - Hitesh Choudhary and Piyush Garg.

## Features

- 🍵 **Casual Tea-time Vibes**: Chat with Hitesh and Piyush in their authentic style
- 🤖 **AI-Powered Conversations**: Powered by OpenAI's GPT models with detailed persona prompts
- 🎨 **Clean Design**: Minimalist interface with subtle animations
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🇮🇳 **Hindi & English**: Natural Hinglish conversations like the real educators

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API

Create a `.env.local` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4o-mini
```

**Note**: Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Start Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── config/
│   ├── openai.ts       # OpenAI configuration
│   └── personas.ts     # Structured system prompts for each persona
├── services/
│   └── chatService.ts  # Modular chat service with OpenAI integration
├── pages/
│   ├── Index.tsx       # Landing page with persona selection
│   └── Chat.tsx        # Chat interface
└── ...
```

## Persona System Prompts

The app uses carefully crafted system prompts to capture the authentic personality and teaching style of each educator:

### Hitesh Choudhary

- Warm, encouraging "chai aur code" personality
- Uses signature Hindi phrases like "हां जी", "चलिए", "अरे यार"
- Focuses on practical learning and motivation
- References his YouTube channels, travels, and startup experience

### Piyush Garg

- Energetic, direct, and practical approach
- Uses phrases like "Letssss Gooooo", "Chai piyenge, chill krenge"
- Emphasizes system design and real-world development
- Keeps things simple and industry-focused

## Environment Variables

| Variable              | Description         | Default       |
| --------------------- | ------------------- | ------------- |
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Required      |
| `VITE_OPENAI_MODEL`   | GPT model to use    | `gpt-4o-mini` |

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **AI**: OpenAI GPT API
- **State Management**: React Hooks

## Features Breakdown

### Landing Page

- Clean 100vh layout that fits perfectly on desktop
- Persona cards with mood and vibe indicators
- Subtle animations with framer-motion
- Professional yet casual design

### Chat Interface

- Blank initial state with welcoming empty state
- Real-time typing indicators
- Message history maintained for context
- Error handling with persona-specific fallback messages
- Responsive design for all screen sizes

### AI Integration

- Modular chat service architecture
- Structured system prompts for authentic conversations
- Conversation history maintained for context
- Graceful fallback when API is unavailable

## Customization

### Adding New Personas

1. Add persona config in `src/config/personas.ts`
2. Update the personas object in both `Index.tsx` and `Chat.tsx`
3. Add persona-specific styling if needed

### Modifying System Prompts

Edit the system prompts in `src/config/personas.ts`. The prompts are structured with:

- Personality & Tone
- Signature Phrases
- Teaching Style
- Technical Expertise
- Response Guidelines

## Security Note

⚠️ **Important**: This app uses `dangerouslyAllowBrowser: true` for OpenAI client, which exposes your API key in the browser. For production, implement a backend proxy to keep your API key secure.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for educational purposes!

---

Built with ❤️ for the developer community • Made in India 🇮🇳
