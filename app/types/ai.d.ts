//===================== Stream Chat =====================//
interface StreamChatOptions {
    endpoint: string;
    messages: Message[];
    onChunk: (content: string) => void;
    onError?: (error: string) => void;
}

interface DialogPromptAIProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    aiPrompt: string;
    setAiPrompt: (prompt: string) => void;
    isAIGenerating: boolean;
    onGenerateAll: () => void;
    onGenerateTitle: () => void;
    onGenerateDescription: () => void;
    onGenerateContent: () => void;
}