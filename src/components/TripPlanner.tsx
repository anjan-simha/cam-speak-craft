import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Clock, Star, MapPin, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TripPlanner() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [tripPlan, setTripPlan] = useState<any>(null);
  const { toast } = useToast();

  const optimizeTrip = () => {
    setIsOptimizing(true);
    toast({
      title: "Optimizing trip...",
      description: "Finding nearby attractions and calculating routes"
    });

    setTimeout(() => {
      setTripPlan({
        suggestions: [
          { name: "Historic Museum", distance: "0.5 km", rating: 4.7, time: "45 min" },
          { name: "Central Park", distance: "1.2 km", rating: 4.5, time: "60 min" },
          { name: "Art Gallery", distance: "0.8 km", rating: 4.6, time: "30 min" }
        ],
        optimizedRoute: "Museum → Art Gallery → Central Park",
        totalTime: "2.5 hours"
      });
      setIsOptimizing(false);
      toast({
        title: "Trip optimized!",
        description: "Your personalized route is ready"
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
            Get AI-optimized routes based on your location and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={optimizeTrip} 
            variant="floating" 
            size="lg" 
            disabled={isOptimizing}
            className="w-full md:w-auto"
          >
            <Compass className="mr-2" />
            {isOptimizing ? "Optimizing..." : "Optimize My Trip"}
          </Button>
        </CardContent>
      </Card>

      {tripPlan && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-accent" />
              Your Optimized Route
              <Badge variant="outline" className="ml-auto">
                <Clock className="w-3 h-3 mr-1" />
                {tripPlan.totalTime}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Suggested Route:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                  {tripPlan.optimizedRoute}
                </p>
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
