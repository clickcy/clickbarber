
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, DollarSign, TrendingUp, Plus } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Dados mockados para demonstração
  const todayStats = {
    appointments: 12,
    clients: 8,
    revenue: 850,
    growth: 15
  };

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const professionals = [
    { id: 1, name: "João Silva", avatar: "JS" },
    { id: 2, name: "Maria Santos", avatar: "MS" },
    { id: 3, name: "Pedro Costa", avatar: "PC" }
  ];

  const mockAppointments = [
    { time: "09:00", professional: 1, client: "Carlos Alberto", service: "Corte + Barba", status: "confirmed" },
    { time: "10:30", professional: 2, client: "Roberto Silva", service: "Corte", status: "confirmed" },
    { time: "14:00", professional: 1, client: "José Santos", service: "Barba", status: "pending" },
    { time: "15:30", professional: 3, client: "André Lima", service: "Corte + Barba", status: "confirmed" },
  ];

  const getAppointmentForSlot = (time: string, professionalId: number) => {
    return mockAppointments.find(apt => apt.time === time && apt.professional === professionalId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            {selectedDate.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button className="gradient-bg hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.appointments}</div>
            <p className="text-xs text-muted-foreground">+2 em relação a ontem</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.clients}</div>
            <p className="text-xs text-muted-foreground">67% dos agendamentos</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {todayStats.revenue}</div>
            <p className="text-xs text-muted-foreground">Meta: R$ 1.000</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+{todayStats.growth}%</div>
            <p className="text-xs text-muted-foreground">Em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Agenda Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Agenda do Dia
          </CardTitle>
          <CardDescription>
            Visualização em tempo real dos agendamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-2 min-w-[600px]">
              {/* Header */}
              <div className="p-3 font-medium text-center border-b">Horário</div>
              {professionals.map(prof => (
                <div key={prof.id} className="p-3 text-center border-b">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {prof.avatar}
                    </div>
                    <span className="font-medium">{prof.name}</span>
                  </div>
                </div>
              ))}

              {/* Time Slots */}
              {timeSlots.map(time => (
                <>
                  <div key={time} className="p-3 text-center font-medium text-muted-foreground border-r">
                    {time}
                  </div>
                  {professionals.map(prof => {
                    const appointment = getAppointmentForSlot(time, prof.id);
                    return (
                      <div key={`${time}-${prof.id}`} className="p-2 min-h-[60px] border-r border-b">
                        {appointment ? (
                          <div className={`p-2 rounded-lg text-xs ${
                            appointment.status === 'confirmed' 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'bg-yellow-50 border border-yellow-200'
                          }`}>
                            <div className="font-medium text-foreground">{appointment.client}</div>
                            <div className="text-muted-foreground">{appointment.service}</div>
                            <Badge 
                              variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                              className="mt-1 text-[10px]"
                            >
                              {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </Badge>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                            <Plus className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
