import { 
  Home, 
  Camera, 
  History as HistoryIcon, 
  Map, 
  Mic, 
  Settings,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { DashboardView } from "@/pages/Dashboard";

interface DashboardSidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const menuItems = [
  { id: "home" as DashboardView, title: "Dashboard", icon: Home },
  { id: "scan" as DashboardView, title: "Scan Landmark", icon: Camera },
  { id: "history" as DashboardView, title: "History", icon: HistoryIcon },
  { id: "trip-planner" as DashboardView, title: "Trip Planner", icon: Map },
  { id: "voice-guide" as DashboardView, title: "Voice Guide", icon: Mic },
  { id: "settings" as DashboardView, title: "Settings", icon: Settings },
];

export function DashboardSidebar({ currentView, onViewChange }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Tourist Guide
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      isActive={isActive}
                      className="w-full"
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <Icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
