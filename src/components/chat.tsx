"use client";
import { useState } from "react";
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
import { Bot, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    {
      type: "chatbot",
      content: "Hello! I'm the Acme Chatbot. How can I assist you today?",
    },
    {
      type: "user",
      content:
        "Hi there! I'm wondering if you can help me with a question about your product?",
    },
    {
      type: "chatbot",
      content: "Absolutely, I'd be happy to help. What's your question?",
    },
    {
      type: "user",
      content:
        "I'm wondering about the pricing for your enterprise plan. Can you provide some more details?",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBu4lTdR36gcmT0hfM0ITfFjcCzTgftvxU",
  });

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
      }
    }
  };

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
              Patrol Monitoring Chatbot
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid gap-4">
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
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`${
                      message.type === "chatbot"
                        ? "bg-primary/55"
                        : "bg-secondary"
                    } rounded-lg p-3 max-w-[80%] prose prose-sm dark:prose-invert`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
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
                className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
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
