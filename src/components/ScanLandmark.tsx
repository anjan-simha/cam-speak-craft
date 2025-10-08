import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Image as ImageIcon, Sparkles, Star, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ScanLandmark() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [landmarkInfo, setLandmarkInfo] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      
      // Simulate landmark recognition
      setIsProcessing(true);
      toast({
        title: "Processing image...",
        description: "AI is analyzing the uploaded image"
      });

      setTimeout(() => {
        setLandmarkInfo({
          name: "Uploaded Landmark",
          description: "AI has identified this landmark from your uploaded image.",
          facts: ["Historical monument", "Famous architecture", "Cultural significance"],
          rating: 4.6
        });
        setIsProcessing(false);
        
        toast({
          title: "Landmark recognized!",
          description: "Upload processed successfully"
        });
      }, 2000);
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Scan Landmark</h1>
        <p className="text-muted-foreground">
          Use your camera to identify and learn about landmarks
        </p>
      </div>

      {/* Camera and Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Camera View */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Scan
            </CardTitle>
            <CardDescription>Use your camera to scan landmarks in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                className="w-full h-64 object-cover"
                playsInline
                muted
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                <Button onClick={openCamera} variant="hero" size="sm">
                  <Camera className="mr-2" />
                  Start Camera
                </Button>
                <Button onClick={captureImage} variant="travel" size="sm">
                  <ImageIcon className="mr-2" />
                  Capture
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload View */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Image
            </CardTitle>
            <CardDescription>Upload a photo of a landmark from your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg overflow-hidden h-64 flex items-center justify-center">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded landmark" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    No image uploaded yet
                  </p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="floating" 
                  size="sm"
                >
                  <Upload className="mr-2" />
                  Choose Image
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </CardContent>
        </Card>
      </div>

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
