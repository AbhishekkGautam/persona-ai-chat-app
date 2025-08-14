import OpenAI from "openai";
import { openaiConfig, validateOpenAIConfig } from "@/config/openai";
import { getPersonaConfig } from "@/config/personas";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

let openaiClient: OpenAI | null = null;
let isInitialized = false;

const initializeOpenAI = (): boolean => {
  try {
    validateOpenAIConfig();
    openaiClient = new OpenAI({
      apiKey: openaiConfig.apiKey,
      dangerouslyAllowBrowser: true,
    });
    isInitialized = true;
    return true;
  } catch (error) {
    console.warn("OpenAI not initialized:", error);
    isInitialized = false;
    return false;
  }
};

const getFallbackResponse = (personaId: string): string => {
  const personaConfig = getPersonaConfig(personaId);
  if (personaConfig) {
    return personaConfig.fallbackMessage;
  }

  return "Sorry, I'm having some technical difficulties right now. Please try again in a moment! 😊";
};

const buildConversationMessages = (
  personaId: string,
  userMessage: string,
  chatHistory: ChatMessage[] = []
): ChatMessage[] => {
  const personaConfig = getPersonaConfig(personaId);
  if (!personaConfig) {
    throw new Error(`Persona ${personaId} not found`);
  }
  return [
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
};

export const sendMessage = async (
  personaId: string,
  userMessage: string,
  chatHistory: ChatMessage[] = []
): Promise<string> => {
  if (!isInitialized) {
    initializeOpenAI();
  }

  if (!isInitialized || !openaiClient) {
    return getFallbackResponse(personaId);
  }

  try {
    const messages = buildConversationMessages(
      personaId,
      userMessage,
      chatHistory
    );

    const completion = await openaiClient.chat.completions.create({
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
    return getFallbackResponse(personaId);
  }
};

export const isConfigured = (): boolean => {
  if (!isInitialized) {
    initializeOpenAI();
  }
  return isInitialized;
};

export const getConfigStatus = () => {
  if (!isInitialized) {
    initializeOpenAI();
  }

  return {
    isConfigured: isInitialized,
    hasApiKey: !!openaiConfig.apiKey,
    model: openaiConfig.model,
  };
};

export const chatService = {
  sendMessage,
  isConfigured,
  getConfigStatus,
};
