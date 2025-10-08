import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Camera, 
  MapPin, 
  Compass, 
  Volume2, 
  VolumeX,
  Image as ImageIcon,
  Navigation,
  Sparkles,
  Clock,
  Star,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/travel-hero.jpg";
import TravelFeatures from "@/components/TravelFeatures";
import InteractiveDemo from "@/components/InteractiveDemo";
import TechnicalGuide from "@/components/TechnicalGuide";
import "../types/speech.d.ts";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lon: number} | null>(null);
  const [landmarkInfo, setLandmarkInfo] = useState<any>(null);
  const [tripOptimization, setTripOptimization] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Initialize location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        toast({
          title: "Location accessed!",
          description: "GPS location retrieved successfully"
        });
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to access your location. Please enable GPS.",
          variant: "destructive"
        });
      }
    );
  };

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
    setIsProcessing(true);
    toast({
      title: "Processing query...",
      description: `Analyzing: "${query}"`
    });

    // Simulate AI processing
    setTimeout(() => {
      setLandmarkInfo({
        name: "Sample Landmark",
        description: "This is a simulated response to your voice query about local attractions.",
        facts: ["Historical significance", "Architectural details", "Cultural importance"],
        rating: 4.5
      });
      
      // Text-to-speech response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          "I found information about nearby attractions based on your query."
        );
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      toast({
        title: "Camera activated!",
        description: "Point at landmarks for AI recognition"
      });
    } catch (error) {
      toast({
        title: "Camera error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    if (context) {
      context.drawImage(videoRef.current, 0, 0);
      
      // Simulate landmark recognition
      setIsProcessing(true);
      setTimeout(() => {
        setLandmarkInfo({
          name: "Recognized Landmark",
          description: "AI has identified this landmark from your captured image.",
          facts: ["Built in the 18th century", "UNESCO World Heritage Site", "Popular tourist destination"],
          rating: 4.8
        });
        setIsProcessing(false);
        
        toast({
          title: "Landmark recognized!",
          description: "Image processed successfully"
        });
      }, 2000);
    }
  };

  const optimizeTrip = () => {
    if (!currentLocation) {
      toast({
        title: "Location required",
        description: "Please enable location access first",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Optimizing trip...",
      description: "Finding nearby attractions and calculating routes"
    });

    // Simulate trip optimization
    setTimeout(() => {
      setTripOptimization({
        suggestions: [
          { name: "Historic Museum", distance: "0.5 km", rating: 4.7, time: "45 min" },
          { name: "Central Park", distance: "1.2 km", rating: 4.5, time: "60 min" },
          { name: "Art Gallery", distance: "0.8 km", rating: 4.6, time: "30 min" }
        ],
        optimizedRoute: "Museum → Art Gallery → Central Park",
        totalTime: "2.5 hours"
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up text-white drop-shadow-[0_0_40px_rgba(59,130,246,0.8)] [text-shadow:_0_0_60px_rgb(59_130_246_/_80%),_0_0_20px_rgb(255_255_255_/_60%)]">
              AI Tourist Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Multimodal Travel Assistant with Dynamic Trip Optimization
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <Link to="/dashboard">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              
              <Button 
                variant="travel" 
                size="lg" 
                onClick={openCamera}
                className="text-lg px-8 py-4"
              >
                <Camera className="mr-2" />
                Quick Scan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Features Component */}
      <TravelFeatures />

      {/* Interactive Demo Component */}
      <InteractiveDemo 
        onVoiceDemo={startVoiceRecognition}
        onCameraDemo={openCamera}
        onLocationDemo={optimizeTrip}
        isProcessing={isProcessing}
      />

      {/* Live Interface Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Live AI Interface</h2>
          <p className="text-xl text-muted-foreground">
            Try the real-time multimodal AI capabilities
          </p>
        </div>

        {/* Camera View */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Live Camera Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                className="w-full h-64 object-cover"
                playsInline
                muted
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <Button onClick={captureImage} variant="hero" size="lg">
                  <ImageIcon className="mr-2" />
                  Capture & Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Landmark Information */}
          {landmarkInfo && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {landmarkInfo.name}
                  <Badge variant="secondary" className="ml-auto">
                    <Star className="w-3 h-3 mr-1" />
                    {landmarkInfo.rating}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{landmarkInfo.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Facts:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {landmarkInfo.facts.map((fact: string, index: number) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(landmarkInfo.description);
                        speechSynthesis.speak(utterance);
                        setIsSpeaking(true);
                        utterance.onend = () => setIsSpeaking(false);
                      }
                    }}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                    {isSpeaking ? "Speaking..." : "Listen"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trip Optimization */}
          {tripOptimization && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-accent" />
                  Trip Optimization
                  <Badge variant="outline" className="ml-auto">
                    <Clock className="w-3 h-3 mr-1" />
                    {tripOptimization.totalTime}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Suggested Route:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                      {tripOptimization.optimizedRoute}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Nearby Attractions:</h4>
                    <div className="space-y-2">
                      {tripOptimization.suggestions.map((place: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="font-medium text-sm">{place.name}</p>
                            <p className="text-xs text-muted-foreground">{place.distance} • {place.time}</p>
                          </div>
                          <Badge variant="secondary">
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
          )}
        </div>

        {/* Status indicators */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {currentLocation && (
            <Badge variant="outline" className="px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              GPS Connected
            </Badge>
          )}
          {isProcessing && (
            <Badge variant="secondary" className="px-4 py-2 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Processing...
            </Badge>
          )}
        </div>
      </div>

      {/* Technical Implementation Guide */}
      <TechnicalGuide />

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
      />
    </div>
  );
};

export default Index;