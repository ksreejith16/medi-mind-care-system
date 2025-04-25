
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Local storage key for saving chat history
const CHAT_HISTORY_KEY = 'medimind_chat_history';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [{
  role: 'model',
  content: "Hello! I'm your AI health assistant. How can I help you today?",
  timestamp: new Date()
}];

const ChatbotAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  useEffect(() => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDXGy81S5vaQz2EdbmSiD1JaOFZQhey7MA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Convert UI messages to Gemini chat history format
      const chatHistory = messages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        history: chatHistory,
      });

      setChatSession(chat);
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }, []);

  // Save messages to local storage
  useEffect(() => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !chatSession || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(inputValue);
      const response = result.response;
      const responseText = response.text();

      const botMessage: Message = {
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'model',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Please try again later.'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const clearChat = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    setMessages(initialMessages);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">AI Health Assistant</h1>
            <p className="mt-4 text-xl text-gray-500">
              Your personal health companion, powered by Gemini AI
            </p>
          </div>
          
          <Card className="mb-8 border-t-4 border-t-health-500 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-health-600" />
                <span>Chat with MediMind</span>
              </CardTitle>
              <CardDescription>
                Ask questions about symptoms, treatments, or general health advice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-md">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        msg.role === 'user'
                          ? "bg-health-600 text-white"
                          : "bg-white border border-gray-200"
                      )}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {msg.role === 'user' ? (
                          <>
                            <span className="text-sm font-medium">You</span>
                            <User className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm font-medium">MediMind AI</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-health-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-health-500 animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-health-500 animate-pulse delay-200"></div>
                        <span className="text-sm text-gray-500">MediMind is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your health question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping || !chatSession}
                />
                <Button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !chatSession}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={clearChat}
                className="w-full"
              >
                Clear Chat History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotAssistant;
