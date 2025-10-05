import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Map, Mic, TrendingUp, Clock, MapPin } from "lucide-react";

export function DashboardHome() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome Back, Traveler! 👋</h1>
        <p className="text-muted-foreground">
          Ready to explore and discover amazing landmarks around you
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+2</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Places Visited</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Across 3 countries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trip Plans</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 active trip
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Start exploring with AI-powered features</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="travel" className="h-auto flex-col py-6 gap-2">
            <Camera className="h-8 w-8" />
            <span className="font-semibold">Scan Landmark</span>
            <span className="text-xs opacity-80">Use camera to identify</span>
          </Button>

          <Button variant="secondary" className="h-auto flex-col py-6 gap-2">
            <Mic className="h-8 w-8" />
            <span className="font-semibold">Voice Guide</span>
            <span className="text-xs opacity-80">Ask questions</span>
          </Button>

          <Button variant="floating" className="h-auto flex-col py-6 gap-2">
            <Map className="h-8 w-8" />
            <span className="font-semibold">Plan Trip</span>
            <span className="text-xs opacity-80">Optimize your route</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest scanned landmarks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Eiffel Tower", location: "Paris, France", time: "2 hours ago", emoji: "🗼" },
              { name: "Taj Mahal", location: "Agra, India", time: "1 day ago", emoji: "🕌" },
              { name: "Statue of Liberty", location: "New York, USA", time: "2 days ago", emoji: "🗽" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-3xl">{item.emoji}</div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
