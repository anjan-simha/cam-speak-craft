import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VoiceGuide() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { toast } = useToast();

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak your travel question"
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      processVoiceQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Speech recognition error",
        description: "Please try again",
        variant: "destructive"
      });
    };

    recognition.start();
  };

  const processVoiceQuery = async (query: string) => {
    toast({
      title: "Processing query...",
      description: `Analyzing: "${query}"`
    });

    setTimeout(() => {
      const aiResponse = {
        query,
        answer: "Based on your question, I recommend visiting the historic district. It features beautiful architecture and rich cultural heritage.",
        suggestions: ["Visit the main square", "Try local cuisine", "Book a guided tour"]
      };
      
      setResponse(aiResponse);
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.answer);
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Voice Guide</h1>
        <p className="text-muted-foreground">
          Ask questions and get voice responses from your AI travel guide
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Assistant
          </CardTitle>
          <CardDescription>
            Tap the button and speak your travel-related questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={startVoiceRecognition}
            disabled={isListening}
            className="w-full md:w-auto"
          >
            {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
            {isListening ? "Listening..." : "Start Voice Guide"}
          </Button>

          {isListening && (
            <Badge variant="secondary" className="animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              Listening to your question...
            </Badge>
          )}
        </CardContent>
      </Card>

      {response && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Your Question:</h4>
              <p className="text-sm bg-muted p-3 rounded-lg">"{response.query}"</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Answer:</h4>
              <p className="bg-primary/5 p-4 rounded-lg border border-primary/20">{response.answer}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Suggestions:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {response.suggestions.map((suggestion: string, index: number) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(response.answer);
                  speechSynthesis.speak(utterance);
                  setIsSpeaking(true);
                  utterance.onend = () => setIsSpeaking(false);
                }
              }}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
              {isSpeaking ? "Speaking..." : "Listen Again"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
