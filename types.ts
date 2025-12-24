export enum ModelType {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview',
  IMAGE_GEN = 'gemini-2.5-flash-image',
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface Attachment {
  mimeType: string;
  data: string; // Base64
  name?: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  attachments?: Attachment[];
  timestamp: number;
  isError?: boolean;
  groundingChunks?: GroundingChunk[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: ModelType;
  systemInstruction?: string;
  useSearch: boolean;
  useThinking: boolean;
}

export type TabView = 'chat' | 'images' | 'settings';