
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, DollarSign } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-primary">ClickBarber</h1>
          </div>
          
          {/* Estatísticas do Dashboard */}
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-md">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Agendamentos: </span>
                <span className="font-semibold text-primary">12</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-md">
              <Users className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Clientes: </span>
                <span className="font-semibold text-primary">8</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-md">
              <DollarSign className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Faturamento: </span>
                <span className="font-semibold text-primary">R$ 850</span>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
