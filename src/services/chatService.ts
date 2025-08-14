import OpenAI from "openai";
import { openaiConfig, validateOpenAIConfig } from "@/config/openai";
import { getPersonaConfig } from "@/config/personas";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class ChatService {
  private openai: OpenAI | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeOpenAI();
  }

  private initializeOpenAI() {
    try {
      validateOpenAIConfig();
      this.openai = new OpenAI({
        apiKey: openaiConfig.apiKey,
        dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
      });
      this.isInitialized = true;
    } catch (error) {
      console.warn("OpenAI not initialized:", error);
      this.isInitialized = false;
    }
  }

  async sendMessage(
    personaId: string,
    userMessage: string,
    chatHistory: ChatMessage[] = []
  ): Promise<string> {
    // Fallback if OpenAI not configured
    if (!this.isInitialized || !this.openai) {
      return this.getFallbackResponse(personaId);
    }

    try {
      const personaConfig = getPersonaConfig(personaId);
      if (!personaConfig) {
        throw new Error(`Persona ${personaId} not found`);
      }

      // Build conversation history
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: personaConfig.systemPrompt,
        },
        ...chatHistory,
        {
          role: "user",
          content: userMessage,
        },
      ];

      const completion = await this.openai.chat.completions.create({
        model: openaiConfig.model,
        messages: messages,
        temperature: openaiConfig.temperature,
        max_tokens: openaiConfig.maxTokens,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("No response from OpenAI");
      }

      return response;
    } catch (error) {
      console.error("Chat service error:", error);
      return this.getFallbackResponse(personaId);
    }
  }

  private getFallbackResponse(personaId: string): string {
    const personaConfig = getPersonaConfig(personaId);
    if (personaConfig) {
      return personaConfig.fallbackMessage;
    }

    // Default fallback
    return "Sorry, I'm having some technical difficulties right now. Please try again in a moment! 😊";
  }

  // Method to check if service is properly configured
  isConfigured(): boolean {
    return this.isInitialized;
  }

  // Method to get configuration status for UI
  getConfigStatus() {
    return {
      isConfigured: this.isInitialized,
      hasApiKey: !!openaiConfig.apiKey,
      model: openaiConfig.model,
    };
  }
}

// Singleton instance
export const chatService = new ChatService();
