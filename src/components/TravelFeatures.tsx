import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Camera, 
  MapPin, 
  Sparkles, 
  Clock, 
  Navigation,
  Globe,
  Zap,
  Brain,
  Route
} from "lucide-react";

const TravelFeatures = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Recognition",
      description: "Ask questions naturally in multiple languages",
      details: ["Speech-to-text conversion", "Natural language processing", "Multilingual support"],
      color: "text-primary",
      delay: "0s"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Image Recognition", 
      description: "Capture landmarks for instant AI identification",
      details: ["CNN-based recognition", "Real-time processing", "Historical fact retrieval"],
      color: "text-secondary",
      delay: "0.1s"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "GPS Integration",
      description: "Location-aware recommendations and optimization",
      details: ["Real-time location tracking", "Proximity-based suggestions", "Route optimization"],
      color: "text-accent",
      delay: "0.2s"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Processing",
      description: "Advanced text summarization and fact generation",
      details: ["T5/BART models", "Context-aware responses", "Intelligent summarization"],
      color: "text-primary",
      delay: "0.3s"
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Trip Optimization",
      description: "Dynamic route planning based on time and preferences",
      details: ["Distance calculation", "Rating-based filtering", "Time management"],
      color: "text-secondary",
      delay: "0.4s"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Output",
      description: "Information delivery in text and speech formats",
      details: ["Text-to-speech synthesis", "Multiple language support", "Cultural context"],
      color: "text-accent",
      delay: "0.5s"
    }
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          Advanced AI Technology
        </Badge>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          Multimodal AI Features
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience cutting-edge artificial intelligence that understands voice, images, and location data to provide the most comprehensive travel assistance available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="text-center hover:shadow-glow transition-all duration-500 animate-scale-in group border-2 hover:border-primary/20"
            style={{ animationDelay: feature.delay }}
          >
            <CardHeader className="pb-4">
              <div className={`w-16 h-16 mx-auto mb-4 ${feature.color} animate-float rounded-full bg-gradient-to-br from-muted to-background flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                    <Zap className="w-3 h-3 mr-2 text-primary" />
                    {detail}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gradient-card rounded-2xl p-8 border-2 border-border">
          <h3 className="text-2xl font-bold mb-4">Complete Implementation Roadmap</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                Phase 1: Core Features (Week 1-2)
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Voice recognition implementation (Vosk/Web Speech API)</li>
                <li>• Camera integration and image capture</li>
                <li>• GPS location services</li>
                <li>• Basic UI/UX framework</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-secondary" />
                Phase 2: AI Integration (Week 3-4)
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• CNN model integration (ResNet/MobileNet)</li>
                <li>• Wikipedia API connection</li>
                <li>• Text summarization (T5/BART models)</li>
                <li>• Trip optimization algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelFeatures;