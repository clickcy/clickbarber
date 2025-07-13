import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar, Clock, Users, DollarSign, TrendingUp, Plus, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import NewAppointmentModal from "@/components/NewAppointmentModal";
import { useAppointments, useDeleteAppointment, useTodayStats } from "@/hooks/useAppointments";
import { useProfessionals } from "@/hooks/useProfessionals";
import { useToast } from "@/hooks/use-toast";
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [prefilledAppointmentData, setPrefilledAppointmentData] = useState<{
    date: Date;
    time: string;
    professionalId: string;
  } | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<{
    id: string;
    time: string;
    professionalId: string;
  } | null>(null);
  const {
    toast
  } = useToast();

  // Hooks para buscar dados reais
  const {
    data: todayStats,
    isLoading: statsLoading
  } = useTodayStats();
  const {
    data: appointments = [],
    isLoading: appointmentsLoading
  } = useAppointments(selectedDate);
  const {
    data: professionals = [],
    isLoading: professionalsLoading
  } = useProfessionals();
  const deleteAppointmentMutation = useDeleteAppointment();

  // Gerar horários de 8h às 18h
  const timeSlots = Array.from({
    length: 11
  }, (_, i) => {
    const hour = 8 + i;
    return hour;
  });

  // Função para calcular posição e altura dos agendamentos
  const getAppointmentPosition = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    // Posição inicial em minutos desde 8h
    const topMinutes = (startHour - 8) * 60 + startMinutes;
    // Duração em minutos
    const durationMinutes = (endHour - startHour) * 60 + (endMinutes - startMinutes);
    return {
      top: topMinutes,
      // minutos desde 8h
      height: durationMinutes // duração em minutos
    };
  };

  // Filtrar agendamentos por profissional
  const getAppointmentsForProfessional = (professionalId: string) => {
    return appointments.filter(apt => apt.professional.id === professionalId);
  };

  // Função para capturar clique e calcular horário exato
  const handleTimelineClick = (event: React.MouseEvent, professionalId: string) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickY = event.clientY - rect.top;

    // Cada hora tem 60px de altura (definido no CSS)
    const minutesFromStart = Math.floor(clickY / 1); // 1px = 1 minuto
    const totalMinutes = minutesFromStart;
    const hour = Math.floor(totalMinutes / 60) + 8; // Começamos das 8h
    const minutes = totalMinutes % 60;

    // Arredondar para intervalos de 15 minutos
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const finalHour = roundedMinutes === 60 ? hour + 1 : hour;
    const finalMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;

    // Validar horário de funcionamento (8h-18h)
    if (finalHour < 8 || finalHour >= 18) return;
    const timeString = `${finalHour.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
    setPrefilledAppointmentData({
      date: selectedDate,
      time: timeString,
      professionalId
    });
    setIsNewAppointmentModalOpen(true);
  };
  const handleNewAppointmentFromButton = () => {
    setPrefilledAppointmentData(undefined);
    setIsNewAppointmentModalOpen(true);
  };
  const handleDeleteAppointment = (appointmentId: string, time: string, professionalId: string) => {
    setAppointmentToDelete({
      id: appointmentId,
      time,
      professionalId
    });
    setDeleteDialogOpen(true);
  };
  const confirmDeleteAppointment = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointmentMutation.mutateAsync(appointmentToDelete.id);
        toast({
          title: "Agendamento cancelado",
          description: "O agendamento foi cancelado com sucesso."
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível cancelar o agendamento. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setDeleteDialogOpen(false);
        setAppointmentToDelete(null);
      }
    }
  };
  return <div className="space-y-6">
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
        <Button className="gradient-bg hover:opacity-90" onClick={handleNewAppointmentFromButton}>
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
            <div className="text-2xl font-bold text-primary">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : todayStats?.appointments || 0}
            </div>
            <p className="text-xs text-muted-foreground">+2 em relação a ontem</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : todayStats?.clients || 0}
            </div>
            <p className="text-xs text-muted-foreground">Clientes únicos hoje</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : `R$ ${todayStats?.revenue?.toFixed(2) || '0,00'}`}
            </div>
            <p className="text-xs text-muted-foreground">Meta: R$ 1.000</p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : `+${todayStats?.growth || 0}%`}
            </div>
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
          {professionalsLoading || appointmentsLoading ? <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Carregando agenda...</span>
            </div> : <div className="overflow-x-auto">
              <div className={`grid grid-cols-[100px_repeat(${professionals.length},1fr)] gap-0 min-w-[600px]`}>
                {/* Header */}
                <div className="p-3 font-medium text-center border-b bg-background sticky top-0 z-10">Horário</div>
                {professionals.map(prof => <div key={prof.id} className="p-3 text-center border-b border-l bg-background sticky top-0 z-10">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium">{prof.name}</span>
                    </div>
                  </div>)}

                {/* Timeline Container */}
                {timeSlots.map(hour => <React.Fragment key={hour}>
                    {/* Hora Label */}
                    <div className="relative border-r border-b bg-background">
                      <div className="absolute top-0 left-3 -mt-2 text-sm font-medium text-muted-foreground bg-background px-1">
                        {hour.toString().padStart(2, '0')}:00
                      </div>
                      {/* Marcações de 15 em 15 minutos */}
                      <div className="h-[60px] relative mx-0 py-[10px]">
                        <div className="absolute top-[15px] right-0 w-2 h-px bg-border"></div>
                        <div className="absolute top-[30px] right-0 w-4 h-px bg-border"></div>
                        <div className="absolute top-[45px] right-0 w-2 h-px bg-border"></div>
                      </div>
                    </div>
                    
                    {/* Colunas dos Profissionais */}
                    {professionals.map(prof => {
                const professionalAppointments = getAppointmentsForProfessional(prof.id);
                return <div key={`${hour}-${prof.id}`} className="relative border-r border-b hover:bg-muted/30 cursor-pointer transition-colors" style={{
                  height: '60px'
                }} onClick={e => handleTimelineClick(e, prof.id)}>
                          {/* Linhas de guia de 15 em 15 min */}
                          <div className="absolute top-[15px] left-0 right-0 h-px bg-border/30"></div>
                          <div className="absolute top-[30px] left-0 right-0 h-px bg-border/50"></div>
                          <div className="absolute top-[45px] left-0 right-0 h-px bg-border/30"></div>
                          
                          {/* Renderizar agendamentos que ocupam este slot de hora */}
                          {professionalAppointments.map(appointment => {
                    const appointmentStart = new Date(appointment.start_time);
                    const appointmentEnd = new Date(appointment.end_time);
                    const currentHourStart = new Date(selectedDate);
                    currentHourStart.setHours(hour, 0, 0, 0);
                    const currentHourEnd = new Date(selectedDate);
                    currentHourEnd.setHours(hour + 1, 0, 0, 0);

                    // Verificar se o agendamento intercepta esta hora
                    const hasIntersection = appointmentStart < currentHourEnd && appointmentEnd > currentHourStart;
                    if (!hasIntersection) return null;

                    // Calcular posição e altura relativas a esta hora
                    const startMinuteInHour = appointmentStart >= currentHourStart ? appointmentStart.getMinutes() : 0;
                    const endMinuteInHour = appointmentEnd <= currentHourEnd ? appointmentEnd.getMinutes() : 60;
                    const topPosition = startMinuteInHour;
                    const height = endMinuteInHour - startMinuteInHour;
                    return <div key={appointment.id} className={`absolute left-1 right-1 rounded-md shadow-sm border z-20 group ${appointment.status === 'agendado' || appointment.status === 'confirmado' ? 'bg-primary text-primary-foreground border-primary/30' : 'bg-yellow-500 text-white border-yellow-400'}`} style={{
                      top: `${topPosition}px`,
                      height: `${Math.max(height, 20)}px`
                    }} onClick={e => e.stopPropagation()}>
                                <button className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors shadow-sm z-30" onClick={e => {
                        e.stopPropagation();
                        handleDeleteAppointment(appointment.id, format(appointmentStart, 'HH:mm'), prof.id);
                      }}>
                                  <X className="h-2.5 w-2.5" />
                                </button>
                                <div className="p-1.5 h-full flex flex-col justify-center">
                                  <div className="font-semibold leading-tight text-xs truncate">
                                    {format(appointmentStart, 'HH:mm')} - {appointment.client.name}
                                  </div>
                                  <div className="text-[10px] opacity-90 leading-tight truncate mt-0.5">
                                    {appointment.services.map(s => s.name).join(', ')}
                                  </div>
                                  {height >= 35 && <div className="mt-1">
                                      <Badge variant={appointment.status === 'confirmado' ? 'secondary' : 'outline'} className="text-[8px] h-4 px-1 py-0 bg-white/20 text-white border-white/30">
                                        {appointment.status === 'confirmado' ? 'Confirmado' : 'Agendado'}
                                      </Badge>
                                    </div>}
                                </div>
                              </div>;
                  })}
                          
                          {/* Área clicável invisível para novos agendamentos */}
                          <div className="absolute inset-0 z-10"></div>
                        </div>;
              })}
                  </React.Fragment>)}
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* Modal de Novo Agendamento */}
      <NewAppointmentModal isOpen={isNewAppointmentModalOpen} onClose={() => setIsNewAppointmentModalOpen(false)} prefilledData={prefilledAppointmentData} />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAppointment} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteAppointmentMutation.isPending}>
              {deleteAppointmentMutation.isPending ? <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelando...
                </> : 'Confirmar Exclusão'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default Dashboard;