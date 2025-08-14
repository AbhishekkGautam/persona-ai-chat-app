import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, MoreVertical, Coffee, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { chatService } from "@/services/chatService";
import type { ChatMessage } from "@/services/chatService";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const personas = {
  hitesh: {
    name: "Hitesh Choudhary",
    nickname: "Chai aur Code",
    description: "Just a guy who loves chai and code",
    avatar: "☕",
  },
  piyush: {
    name: "Piyush Garg",
    nickname: "Practical Guru",
    description: "Keeping it real, keeping it simple",
    avatar: "🚀",
  },
};

const Chat = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const persona = personas[personaId as keyof typeof personas];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!persona) {
    return <div>Persona not found</div>;
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);

    // Update chat history for OpenAI
    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: newMessage },
    ];

    const currentMessage = newMessage;
    setNewMessage("");
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await chatService.sendMessage(
        personaId as string,
        currentMessage,
        chatHistory
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Update chat history
      setChatHistory([
        ...updatedHistory,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Failed to get AI response:", error);

      // Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          personaId === "hitesh"
            ? "अरे यार, कुछ technical issue आ गया! 😅 Dobara try करके देखो."
            : "अरे यार, कुछ technical glitch हो गया! 😅 Try again करो.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
              {persona.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">{persona.name}</h1>
              <p className="text-xs text-muted-foreground">
                {persona.description} • Online now
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-muted p-2"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Empty State */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-950/50 rounded-full flex items-center justify-center text-4xl mb-4">
                  {persona.avatar}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {persona.name}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {personaId === "hitesh"
                    ? "चाय तैयार है? ☕ Let's have a casual chat about code, tech, or anything you want to know!"
                    : "Ready to code and chill? 🚀 Ask me anything about development, system design, or just chat!"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coffee className="w-4 h-4" />
                  <span>Start the conversation below</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex items-end gap-3 max-w-[80%]`}>
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-1">
                      {persona.avatar}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-orange-500 text-white rounded-br-md"
                          : "bg-card text-card-foreground border border-border rounded-bl-md shadow-sm"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-card-foreground prose-p:text-card-foreground prose-strong:text-card-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded dark:prose-headings:text-card-foreground dark:prose-p:text-card-foreground">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}
                    </div>

                    <p
                      className={`text-xs text-muted-foreground mt-1 px-1 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-3 max-w-[80%]">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-1">
                  {persona.avatar}
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Typing...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder={`Type your message...`}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[48px] max-h-32 resize-none border-gray-200 bg-white/70 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-xl px-4 py-3 shadow-sm transition-all duration-200"
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "48px",
                }}
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isLoading}
              size="sm"
              className="w-12 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0 disabled:bg-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
