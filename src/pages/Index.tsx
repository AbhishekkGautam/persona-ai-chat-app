import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Coffee, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const personas = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    title: "Full-Stack Educator",
    description: "Making coding accessible through practical tutorials and genuine mentorship",
    bio: "Join me for a casual conversation about JavaScript, React, or anything tech. Let's keep it simple and fun! ☕",
    avatar: "☕",
    mood: "Always ready for chai",
    vibe: "Calm & Encouraging",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    title: "System Design Expert",
    description: "Building scalable systems and sharing practical development insights",
    bio: "Let's talk about real-world development, DevOps, or your coding journey. No pressure, just good vibes! 🚀",
    avatar: "🚀",
    mood: "Energetic & Motivating",
    vibe: "Direct & Honest",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handlePersonaSelect = (personaId: string) => {
    navigate(`/chat/${personaId}`);
  };

  return (
    <div className="lg:h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Coffee className="w-7 h-7 text-orange-600" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Chai & Code</h1>
              <p className="text-xs text-muted-foreground">
                Casual chats with your favorite devs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with love</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                <Coffee className="w-4 h-4" />
                Tea Time Conversations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who do you want to chat with today?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Grab your chai and have a casual conversation with Hitesh or
                Piyush. Ask anything, get real advice, and enjoy the vibe!
              </p>
            </motion.div>
          </div>

          {/* Persona Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handlePersonaSelect(persona.id)}
              >
                                 <div className="bg-card border border-border rounded-xl p-6 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md transition-all duration-200 h-full">
                   {/* Header */}
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/50 rounded-xl flex items-center justify-center text-2xl">
                         {persona.avatar}
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold text-card-foreground">
                           {persona.name}
                         </h3>
                         <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                           {persona.title}
                         </p>
                       </div>
                     </div>
                     <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                   </div>

                   {/* Description */}
                   <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                     {persona.description}
                   </p>

                   {/* Bio */}
                   <p className="text-card-foreground text-sm mb-6 leading-relaxed">
                     {persona.bio}
                   </p>

                   {/* Footer */}
                   <div className="flex items-center justify-between pt-4 border-t border-border">
                     <div className="flex items-center gap-3 text-xs text-muted-foreground">
                       <span>{persona.mood}</span>
                       <span>•</span>
                       <span>{persona.vibe}</span>
                     </div>
                     <span className="text-orange-600 dark:text-orange-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                       Chat now →
                     </span>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-card border border-border rounded-lg p-4 text-center"
            >
              <MessageCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium text-card-foreground text-sm mb-1">Bilingual Support</h4>
              <p className="text-xs text-muted-foreground">Hindi & English conversations</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-card border border-border rounded-lg p-4 text-center"
            >
              <Coffee className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium text-card-foreground text-sm mb-1">Casual & Fun</h4>
              <p className="text-xs text-muted-foreground">Relaxed learning environment</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-card border border-border rounded-lg p-4 text-center"
            >
              <Heart className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium text-card-foreground text-sm mb-1">Judgment Free</h4>
              <p className="text-xs text-muted-foreground">Ask anything, just good vibes</p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-6 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using React, TypeScript & OpenAI • Made by{" "}
            <a
              href="https://twitter.com/helloAbhishekk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors"
            >
              @helloAbhishekk
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
