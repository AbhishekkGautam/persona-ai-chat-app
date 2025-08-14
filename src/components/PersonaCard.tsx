import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Persona {
  id: string;
  name: string;
  description: string;
  bio: string;
  avatar: string;
  color: string;
}

interface PersonaCardProps {
  persona: Persona;
  onClick: () => void;
}

export const PersonaCard = ({ persona, onClick }: PersonaCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="p-6 bg-card hover:bg-card-hover border-border transition-colors duration-200">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl">
            {persona.avatar}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              {persona.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {persona.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {persona.bio}
            </p>
          </div>
          
          {/* Chat Icon */}
          <motion.div
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            className="text-primary"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.div>
        </div>
        
        {/* Action hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-xs text-muted-foreground text-center">
            Click to start chatting
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};