import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  Camera, 
  MapPin, 
  Play, 
  Pause,
  Volume2,
  Image as ImageIcon,
  Navigation,
  Star,
  Clock,
  Route,
  Compass
} from "lucide-react";

interface DemoProps {
  onVoiceDemo: () => void;
  onCameraDemo: () => void;
  onLocationDemo: () => void;
  isProcessing: boolean;
}

const InteractiveDemo = ({ onVoiceDemo, onCameraDemo, onLocationDemo, isProcessing }: DemoProps) => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const demoScenarios = [
    {
      id: "voice",
      title: "Voice Query Demo",
      description: "Try asking: 'Tell me about nearby museums'",
      icon: <Mic className="w-5 h-5" />,
      action: onVoiceDemo,
      color: "primary"
    },
    {
      id: "camera", 
      title: "Image Recognition Demo",
      description: "Point camera at any landmark or monument",
      icon: <Camera className="w-5 h-5" />,
      action: onCameraDemo,
      color: "secondary"
    },
    {
      id: "location",
      title: "Trip Optimization Demo", 
      description: "Get personalized route recommendations",
      icon: <MapPin className="w-5 h-5" />,
      action: onLocationDemo,
      color: "accent"
    }
  ];

  const sampleResults = {
    voice: {
      query: "Tell me about the Taj Mahal",
      response: "The Taj Mahal is a UNESCO World Heritage Site located in Agra, India. Built between 1632-1653 by Emperor Shah Jahan as a mausoleum for his wife Mumtaz Mahal...",
      facts: [
        "Built with white marble from Rajasthan",
        "Took 22 years and 20,000 workers to complete", 
        "Changes color throughout the day",
        "One of the New Seven Wonders of the World"
      ]
    },
    camera: {
      landmark: "Eiffel Tower",
      confidence: "94.7%",
      location: "Paris, France",
      facts: [
        "Constructed between 1887-1889",
        "Height: 330 meters (1,083 feet)",
        "Iron lattice tower designed by Gustave Eiffel",
        "Most visited paid monument in the world"
      ]
    },
    optimization: {
      currentLocation: "Central Park, NYC",
      suggestions: [
        { name: "Metropolitan Museum", distance: "0.8 km", time: "10 min walk", rating: 4.6 },
        { name: "Guggenheim Museum", distance: "1.2 km", time: "15 min walk", rating: 4.4 },
        { name: "American Museum", distance: "2.1 km", time: "8 min taxi", rating: 4.8 }
      ],
      optimizedRoute: "Central Park → Met Museum → Guggenheim → American Museum",
      totalTime: "4.5 hours",
      savings: "Saves 2.3 km walking distance"
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Interactive Demonstration</h2>
        <p className="text-xl text-muted-foreground">
          Experience the AI Tourist Guide capabilities with these interactive demos
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voice">Voice AI</TabsTrigger>
          <TabsTrigger value="vision">Vision AI</TabsTrigger>
          <TabsTrigger value="optimization">Trip AI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {demoScenarios.map((demo) => (
              <Card key={demo.id} className="hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 text-${demo.color} animate-float rounded-full bg-gradient-to-br from-muted to-background flex items-center justify-center`}>
                    {demo.icon}
                  </div>
                  <CardTitle>{demo.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{demo.description}</p>
                  <Button 
                    onClick={() => {
                      setActiveDemo(demo.id);
                      demo.action();
                    }}
                    variant={activeDemo === demo.id ? "default" : "outline"}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing && activeDemo === demo.id ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Try Demo
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                Voice Recognition & Natural Language Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Sample Query:</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="italic">"{sampleResults.voice.query}"</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen to Response
                    </Button>
                    <Badge variant="secondary">English</Badge>
                    <Badge variant="outline">Audio Output</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">AI Response:</h4>
                  <div className="bg-gradient-card p-4 rounded-lg border">
                    <p className="text-sm mb-3">{sampleResults.voice.response}</p>
                    <div className="space-y-1">
                      {sampleResults.voice.facts.map((fact, index) => (
                        <div key={index} className="flex items-start text-xs text-muted-foreground">
                          <Star className="w-3 h-3 mr-2 mt-0.5 text-primary" />
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-secondary" />
                Image Recognition & Landmark Identification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Recognition Results:</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{sampleResults.camera.landmark}</p>
                        <p className="text-sm text-muted-foreground">{sampleResults.camera.location}</p>
                      </div>
                      <Badge variant="secondary">
                        {sampleResults.camera.confidence}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Historical Facts:</h5>
                      {sampleResults.camera.facts.map((fact, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <ImageIcon className="w-3 h-3 mr-2 mt-0.5 text-secondary" />
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Camera Feed:</h4>
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white/70">
                      <Camera className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Live Camera Preview</p>
                      <p className="text-xs">Point at landmarks for instant recognition</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-accent" />
                Intelligent Trip Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Current Location:</h4>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mb-4">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{sampleResults.optimization.currentLocation}</span>
                  </div>
                  
                  <h4 className="font-semibold mb-3">Optimized Route:</h4>
                  <div className="bg-gradient-card p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Route className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{sampleResults.optimization.optimizedRoute}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {sampleResults.optimization.totalTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3 h-3" />
                        {sampleResults.optimization.savings}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Nearby Attractions:</h4>
                  <div className="space-y-2">
                    {sampleResults.optimization.suggestions.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{place.name}</p>
                          <p className="text-xs text-muted-foreground">{place.distance} • {place.time}</p>
                        </div>
                        <Badge variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          {place.rating}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveDemo;