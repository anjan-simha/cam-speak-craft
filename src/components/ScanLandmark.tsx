import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Image as ImageIcon, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ScanLandmark() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [landmarkInfo, setLandmarkInfo] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

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

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Scan Landmark</h1>
        <p className="text-muted-foreground">
          Use your camera to identify and learn about landmarks
        </p>
      </div>

      {/* Camera View */}
      <Card className="overflow-hidden">
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
              className="w-full h-96 object-cover"
              playsInline
              muted
            />
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
              <Button onClick={openCamera} variant="hero" size="lg">
                <Camera className="mr-2" />
                Start Camera
              </Button>
              <Button onClick={captureImage} variant="travel" size="lg">
                <ImageIcon className="mr-2" />
                Capture & Analyze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
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
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <div className="text-center py-8">
          <Badge variant="secondary" className="px-4 py-2 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Processing...
          </Badge>
        </div>
      )}
    </div>
  );
}
