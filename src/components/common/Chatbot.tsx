'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { sendMessage } from '@/actions/chat';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'model',
      content: 'Hello! How can I help you find the perfect neighborhood in India today?',
    },
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage({ 
        message: inputValue, 
        history: messages.map(m => ({role: m.role, content: m.content}))
      });
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chatbot submission error:", error);
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I couldn't get a response. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggle}
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm shadow-xl flex flex-col animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">NextHood Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleToggle} className="h-6 w-6">
                <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <ScrollArea className="flex-1 h-80 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg p-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
               {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
