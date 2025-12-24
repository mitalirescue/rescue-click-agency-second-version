import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { ModelType, Attachment, GroundingChunk } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Encodes a File object to Base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Generates content stream for chat interactions
 */
export const streamChatResponse = async (
  history: { role: string; parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] }[],
  lastMessage: string,
  attachments: Attachment[],
  model: ModelType,
  useSearch: boolean,
  useThinking: boolean,
  onChunk: (text: string, grounding?: GroundingChunk[]) => void
) => {
  // Construct the current user message parts
  const currentParts: Part[] = [];
  
  // Add attachments first
  attachments.forEach(att => {
    currentParts.push({
      inlineData: {
        mimeType: att.mimeType,
        data: att.data
      }
    });
  });

  // Add text
  if (lastMessage) {
    currentParts.push({ text: lastMessage });
  }

  // Configure tools
  const tools = [];
  if (useSearch) {
    tools.push({ googleSearch: {} });
  }

  // Configure thinking
  const thinkingConfig = useThinking && model === ModelType.PRO
    ? { thinkingConfig: { thinkingBudget: 4096 } } // Only valid for 2.5/3 Pro/Flash series if supported. 
    // Note: The prompt guidelines mention thinking for 2.5 series. 
    // If user selected Flash (2.5), we can try it. If Pro (3), we can try it.
    : undefined;

  // We use the chat interface for history management, but for granular control over the *latest* message with specific tools/images,
  // sometimes generateContentStream is easier if we manually manage history. 
  // However, ai.chats.create is cleaner. Let's build the history for the chat.
  
  // Convert our simplified history to Gemini Chat history format
  // Note: Gemini Chat history expects specific structure.
  const chatHistory = history.map(h => ({
    role: h.role,
    parts: h.parts,
  }));

  const chat = ai.chats.create({
    model: model,
    history: chatHistory,
    config: {
      tools: tools.length > 0 ? tools : undefined,
      ...thinkingConfig,
    }
  });

  try {
    const resultStream = await chat.sendMessageStream({
      message: currentParts
    });

    for await (const chunk of resultStream) {
      const responseChunk = chunk as GenerateContentResponse;
      const text = responseChunk.text;
      const grounding = responseChunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (text || grounding) {
        onChunk(text || '', grounding as GroundingChunk[]);
      }
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    throw error;
  }
};

/**
 * Generates an image using the specialized image generation model
 */
export const generateImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"): Promise<string[]> => {
  // Using generateContent with gemini-2.5-flash-image for image generation as per guidelines
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // imageSize: "1K" // Optional
        }
      }
    });

    const images: string[] = [];
    
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          images.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
        }
      }
    }
    
    return images;
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};