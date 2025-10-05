import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MapPin, Star, Trash2, Eye } from "lucide-react";

// Mock data for scanned landmarks
const mockHistory = [
  {
    id: 1,
    name: "Eiffel Tower",
    location: "Paris, France",
    scannedAt: "2024-03-15 14:30",
    rating: 4.9,
    image: "🗼",
    description: "Iconic iron lattice tower on the Champ de Mars"
  },
  {
    id: 2,
    name: "Taj Mahal",
    location: "Agra, India",
    scannedAt: "2024-03-14 10:15",
    rating: 4.8,
    image: "🕌",
    description: "Ivory-white marble mausoleum, UNESCO World Heritage Site"
  },
  {
    id: 3,
    name: "Statue of Liberty",
    location: "New York, USA",
    scannedAt: "2024-03-13 16:45",
    rating: 4.7,
    image: "🗽",
    description: "Neoclassical sculpture on Liberty Island"
  },
  {
    id: 4,
    name: "Great Wall of China",
    location: "Beijing, China",
    scannedAt: "2024-03-12 09:00",
    rating: 4.9,
    image: "🏯",
    description: "Ancient series of fortifications and walls"
  },
  {
    id: 5,
    name: "Colosseum",
    location: "Rome, Italy",
    scannedAt: "2024-03-11 13:20",
    rating: 4.8,
    image: "🏛️",
    description: "Oval amphitheatre in the centre of Rome"
  }
];

export function History() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Scan History</h1>
        <p className="text-muted-foreground">
          View all landmarks you've scanned and explored
        </p>
      </div>

      <div className="grid gap-4">
        {mockHistory.map((landmark) => (
          <Card key={landmark.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{landmark.image}</div>
                  <div>
                    <CardTitle className="text-2xl">{landmark.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {landmark.location}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {landmark.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{landmark.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{landmark.scannedAt}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockHistory.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold mb-2">No scans yet</h3>
          <p className="text-muted-foreground">
            Start scanning landmarks to build your travel history
          </p>
        </div>
      )}
    </div>
  );
}
