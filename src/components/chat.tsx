"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { geminiApiKey } from "@/lib/env";

type Message = {
  type: "user" | "chatbot";
  content: string;
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: geminiApiKey,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          type: "user",
          content: newMessage,
        },
      ]);
      setNewMessage("");
      setIsLoading(true);

      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: newMessage,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "chatbot",
            content: response.text ?? "Sorry, I couldn't generate a response.",
          },
        ]);
      } catch (error) {
        console.error("Error calling Google Gen AI:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "chatbot",
            content: "Oops, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-10 right-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full bg-primary text-primary-foreground h-[40px] w-[40px]"
          >
            <Bot className="w-20 h-20" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] w-full h-[600px] flex flex-col">
          <DialogHeader className="border-b">
            <DialogTitle className="text-lg font-medium text-center">
              Gyh Patrol Monitoring Asistant
            </DialogTitle>
          </DialogHeader>
          <div
            ref={chatContainerRef} // Add ref for scroll handling
            className="flex-1 overflow-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.type === "user" ? "justify-end" : ""
                }`}
              >
                {message.type === "chatbot" && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Chatbot" />
                    <AvatarFallback>GYH</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`${
                    message.type === "chatbot"
                      ? "bg-primary/55"
                      : "bg-secondary"
                  } rounded-lg p-3 max-w-[80%] text-sm prose prose-sm dark:prose-invert break-words`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.type === "user" && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>DAR</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center w-full">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
              </div>
            )}
          </div>
          <div className="border-t p-2">
            <div className="relative">
              <Textarea
                placeholder="Type your message..."
                name="message"
                id="message"
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 text-sm"
              />
              <Button
                type="button"
                size="icon"
                className="absolute w-8 h-8 top-3 right-3"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
