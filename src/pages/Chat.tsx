import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Coffee,
  Loader2,
  Code,
  User,
  Briefcase,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { chatService } from "@/services/chatService";
import type { ChatMessage } from "@/services/chatService";
import { getPersonaConfig } from "@/config/personas";
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
    title: "Full-Stack Educator",
    description: "Just a guy who loves chai and code",
    avatar: "/images/hitesh_choudhary.jpg",
    emoji: "☕",
  },
  piyush: {
    name: "Piyush Garg",
    title: "System Design Expert",
    description: "Keeping it real, keeping it simple",
    avatar: "/images/piyush_garg.jpg",
    emoji: "🚀",
  },
};

const Chat = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "tech" | "career" | "casual" | "personal"
  >("tech");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const persona = personas[personaId as keyof typeof personas];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  if (!persona) {
    return <div>Persona not found</div>;
  }

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || newMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);

    // Update chat history for OpenAI
    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: messageToSend },
    ];

    const currentMessage = messageToSend;
    setNewMessage("");
    setIsLoading(true);

    try {
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

      setChatHistory([
        ...updatedHistory,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Failed to get AI response:", error);

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
    <div className="mobile-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full z-10"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-sm sm:text-base font-semibold text-foreground">
                {persona.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {persona.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-muted/30 p-4">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {messages.length === 0 && (
            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center pt-8 sm:pt-16 pb-6 sm:pb-8 px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-3 sm:mb-4 ring-1 ring-border">
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {persona.name}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-xs sm:max-w-md leading-relaxed">
                  {personaId === "hitesh"
                    ? "चाय तैयार है? Let's have a casual chat about code, tech, or anything you want to know!"
                    : "Ready to code and chill? Ask me anything about development, system design, or just chat!"}
                </p>
              </div>

              {/* Conversation Starters Section */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-full px-3 sm:px-6">
                  <div className="text-center mb-6 sm:mb-12">
                    <h3 className="text-sm sm:text-base font-medium text-muted-foreground mb-4 sm:mb-8">
                      Choose a topic to get started
                    </h3>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-12">
                      <Badge
                        variant={
                          activeFilter === "tech" ? "default" : "secondary"
                        }
                        className={`cursor-pointer px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border-0 ${
                          activeFilter === "tech"
                            ? "text-background"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                        onClick={() => setActiveFilter("tech")}
                      >
                        <Code className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Tech
                      </Badge>
                      <Badge
                        variant={
                          activeFilter === "career" ? "default" : "secondary"
                        }
                        className={`cursor-pointer px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border-0 ${
                          activeFilter === "career"
                            ? "text-background"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                        onClick={() => setActiveFilter("career")}
                      >
                        <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Career
                      </Badge>
                      <Badge
                        variant={
                          activeFilter === "casual" ? "default" : "secondary"
                        }
                        className={`cursor-pointer px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border-0 ${
                          activeFilter === "casual"
                            ? "text-background"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                        onClick={() => setActiveFilter("casual")}
                      >
                        <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Casual
                      </Badge>
                      <Badge
                        variant={
                          activeFilter === "personal" ? "default" : "secondary"
                        }
                        className={`cursor-pointer px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border-0 ${
                          activeFilter === "personal"
                            ? "text-background"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                        onClick={() => setActiveFilter("personal")}
                      >
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Personal
                      </Badge>
                    </div>
                  </div>

                  {/* Categorized Starters */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-3xl mx-auto">
                      {(() => {
                        const allStarters = getPersonaConfig(
                          personaId as string
                        )?.conversationStarters;
                        if (!allStarters) return [];

                        // Show all questions from selected category
                        const questionsToShow = allStarters[activeFilter] || [];

                        return questionsToShow.map((starter, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="text-left justify-start h-auto py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-normal bg-card border-border hover:bg-orange-50 hover:border-orange-200 dark:bg-card dark:border-border dark:hover:bg-orange-950/30 dark:hover:border-orange-800/50 whitespace-normal w-full rounded-lg"
                            onClick={() => {
                              handleSendMessage(starter);
                            }}
                          >
                            <span className="block w-full text-left leading-relaxed break-words">
                              {starter}
                            </span>
                          </Button>
                        ));
                      })()}
                    </div>

                    {/* Quick Info */}
                    <div className="text-center pt-4 sm:pt-8 pb-4">
                      <p className="text-xs sm:text-sm text-muted-foreground/80">
                        Or type your own question below
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Container */}
          {messages.length > 0 && (
            <div className="space-y-4 flex-1">
              {/* Messages */}
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-3 max-w-[95%] sm:max-w-[80%]`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0 mb-1">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-full h-full object-cover"
                          />
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
                              <ReactMarkdown>{message?.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          )}
                        </div>

                        <p
                          className={`text-xs text-muted-foreground mt-1 px-1 ${
                            message.sender === "user"
                              ? "text-right"
                              : "text-left"
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
                    <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0 mb-1">
                      <img
                        src={persona.avatar}
                        alt={persona.name}
                        className="w-full h-full object-cover"
                      />
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
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-background/60 backdrop-blur-xl border-t border-border/30 p-4 supports-[backdrop-filter]:bg-background/40">
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
                className="min-h-[48px] max-h-32 resize-none border-border bg-background/70 focus:bg-background rounded-xl px-4 py-3 shadow-sm transition-all duration-200"
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "48px",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>

            <Button
              onClick={() => handleSendMessage(newMessage)}
              disabled={!newMessage.trim() || isLoading}
              size="sm"
              className="w-12 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:hover:bg-orange-300 flex-shrink-0 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Send className="w-4 h-4 text-white disabled:text-white opacity-100 disabled:opacity-70" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
