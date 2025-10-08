import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation, Clock, Star, MapPin, Compass, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TripPlanner() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [tripPlan, setTripPlan] = useState<any>(null);
  const [sourceAddress, setSourceAddress] = useState("");
  const { toast } = useToast();

  const optimizeTrip = () => {
    if (!sourceAddress.trim()) {
      toast({
        title: "Source address required",
        description: "Please enter your starting point",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    toast({
      title: "Optimizing trip...",
      description: "Planning round-trip route from your location"
    });

    setTimeout(() => {
      setTripPlan({
        sourceAddress: sourceAddress,
        suggestions: [
          { name: "Historic Museum", distance: "0.5 km", rating: 4.7, time: "45 min" },
          { name: "Central Park", distance: "1.2 km", rating: 4.5, time: "60 min" },
          { name: "Art Gallery", distance: "0.8 km", rating: 4.6, time: "30 min" }
        ],
        optimizedRoute: `${sourceAddress} → Museum → Art Gallery → Central Park → ${sourceAddress}`,
        totalTime: "3 hours",
        totalDistance: "4.5 km"
      });
      setIsOptimizing(false);
      toast({
        title: "Round-trip planned!",
        description: "Your route includes return to starting point"
      });
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Trip Planner</h1>
        <p className="text-muted-foreground">
          Optimize your travel route with AI-powered recommendations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Plan Your Route
          </CardTitle>
          <CardDescription>
            Get AI-optimized round-trip routes that return you to your starting point
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Starting Point
            </Label>
            <Input
              id="source"
              placeholder="Enter your starting address (e.g., 123 Main St)"
              value={sourceAddress}
              onChange={(e) => setSourceAddress(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={optimizeTrip} 
            variant="floating" 
            size="lg" 
            disabled={isOptimizing}
            className="w-full md:w-auto"
          >
            <Compass className="mr-2" />
            {isOptimizing ? "Optimizing..." : "Plan Round Trip"}
          </Button>
        </CardContent>
      </Card>

      {tripPlan && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-accent" />
              Your Round-Trip Route
              <Badge variant="outline" className="ml-auto">
                <Clock className="w-3 h-3 mr-1" />
                {tripPlan.totalTime}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2 mb-2">
                  <Home className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Starting & Return Point:</h4>
                    <p className="text-sm text-muted-foreground">{tripPlan.sourceAddress}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Optimized Round-Trip Route:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                  {tripPlan.optimizedRoute}
                </p>
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span>Total Distance: {tripPlan.totalDistance}</span>
                  <span>•</span>
                  <span>Includes return journey</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Nearby Attractions:</h4>
                <div className="space-y-3">
                  {tripPlan.suggestions.map((place: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{place.name}</p>
                          <p className="text-sm text-muted-foreground">{place.distance} • {place.time}</p>
                        </div>
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
  );
}
