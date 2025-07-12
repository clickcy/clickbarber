
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-primary">ClickBarber</h1>
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
