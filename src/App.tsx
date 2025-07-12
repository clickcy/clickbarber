
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Professionals from "./pages/Professionals";
import ServicesProducts from "./pages/ServicesProducts";
import PointOfSale from "./pages/PointOfSale";
import Financial from "./pages/Financial";
import Marketing from "./pages/Marketing";
import Settings from "./pages/Settings";
import BookingPublic from "./pages/BookingPublic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/agendamento" element={<BookingPublic />} />
          <Route path="*" element={
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clientes" element={<Clients />} />
                    <Route path="/profissionais" element={<Professionals />} />
                    <Route path="/servicos-produtos" element={<ServicesProducts />} />
                    <Route path="/pdv" element={<PointOfSale />} />
                    <Route path="/financeiro" element={<Financial />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="/configuracoes" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </div>
            </SidebarProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
