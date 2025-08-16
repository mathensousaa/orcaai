import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="h-full px-4 flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="font-semibold text-foreground">Sistema de Orçamentos</h1>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}