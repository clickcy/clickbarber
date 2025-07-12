
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  MessageSquare, 
  Settings,
  Home,
  Scissors
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Profissionais",
    url: "/profissionais",
    icon: UserCheck,
  },
  {
    title: "Serviços & Produtos",
    url: "/servicos-produtos",
    icon: Package,
  },
  {
    title: "Ponto de Venda",
    url: "/pdv",
    icon: ShoppingCart,
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: DollarSign,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: MessageSquare,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Scissors className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">ClickBarber</h2>
            <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
