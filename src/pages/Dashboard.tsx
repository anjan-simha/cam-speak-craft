import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHome } from "@/components/DashboardHome";
import { History } from "@/components/History";
import { ScanLandmark } from "@/components/ScanLandmark";
import { TripPlanner } from "@/components/TripPlanner";
import { VoiceGuide } from "@/components/VoiceGuide";

export type DashboardView = "home" | "scan" | "history" | "trip-planner" | "voice-guide" | "settings";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>("home");

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <DashboardHome />;
      case "scan":
        return <ScanLandmark />;
      case "history":
        return <History />;
      case "trip-planner":
        return <TripPlanner />;
      case "voice-guide":
        return <VoiceGuide />;
      case "settings":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings will be available soon.</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
