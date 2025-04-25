
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI health assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatbotAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    // This is where you'll integrate your chatbot code
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: getPlaceholderResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getPlaceholderResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('headache') || lowerInput.includes('head') || lowerInput.includes('pain')) {
      return "Headaches can be caused by various factors including stress, dehydration, or lack of sleep. For mild headaches, try drinking water, resting in a dark room, or taking over-the-counter pain relievers. If you experience severe or persistent headaches, please consult with a healthcare professional.";
    } else if (lowerInput.includes('cold') || lowerInput.includes('flu') || lowerInput.includes('fever')) {
      return "For cold and flu symptoms, it's important to rest, stay hydrated, and consider over-the-counter medications to manage symptoms. If you have a high fever or symptoms persist for more than a week, please consult with a healthcare professional.";
    } else if (lowerInput.includes('diet') || lowerInput.includes('nutrition') || lowerInput.includes('food')) {
      return "A balanced diet is crucial for overall health. Try to include a variety of fruits, vegetables, lean proteins, and whole grains. Check our nutrition recommendations feature for personalized advice based on your health profile!";
    } else {
      return "Thank you for your question. As an AI assistant, I can provide general health information, but for specific medical advice, please consult with a healthcare professional. Is there anything specific about your health you'd like to know more about?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">AI Health Assistant</h1>
            <p className="mt-4 text-xl text-gray-500">
              Your personal health companion, ready to assist 24/7
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
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        msg.sender === 'user'
                          ? "bg-health-600 text-white"
                          : "bg-white border border-gray-200"
                      )}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {msg.sender === 'user' ? (
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
                      <p className="text-sm">{msg.content}</p>
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
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your health question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Integration Notes</h3>
            <p className="mt-2 text-gray-600">
              This is where you'll integrate your AI chatbot health assistant code. 
              The interface allows users to ask health-related questions and receive responses from your AI assistant.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotAssistant;
