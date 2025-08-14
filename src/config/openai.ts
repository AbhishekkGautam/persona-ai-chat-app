// OpenAI Configuration
export const openaiConfig = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 1000,
};

// Validate configuration
export const validateOpenAIConfig = () => {
  if (!openaiConfig.apiKey) {
    throw new Error(
      "OpenAI API key is required. Please set VITE_OPENAI_API_KEY in your environment variables."
    );
  }
};
