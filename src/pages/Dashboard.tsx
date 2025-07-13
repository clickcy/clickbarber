
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
  
  const { toast } = useToast();
  
  // Hooks para buscar dados reais
  const { data: todayStats, isLoading: statsLoading } = useTodayStats();
  const { data: appointments = [], isLoading: appointmentsLoading } = useAppointments(selectedDate);
  const { data: professionals = [], isLoading: professionalsLoading } = useProfessionals();
  const deleteAppointmentMutation = useDeleteAppointment();

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getAppointmentForSlot = (time: string, professionalId: string) => {
    return appointments.find(apt => {
      const appointmentTime = format(new Date(apt.start_time), 'HH:mm');
      return appointmentTime === time && apt.professional.id === professionalId;
    });
  };

  const handleNewAppointmentClick = (time: string, professionalId: string) => {
    setPrefilledAppointmentData({
      date: selectedDate,
      time,
      professionalId
    });
    setIsNewAppointmentModalOpen(true);
  };

  const handleNewAppointmentFromButton = () => {
    setPrefilledAppointmentData(undefined);
    setIsNewAppointmentModalOpen(true);
  };

  const handleDeleteAppointment = (appointmentId: string, time: string, professionalId: string) => {
    setAppointmentToDelete({ id: appointmentId, time, professionalId });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAppointment = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointmentMutation.mutateAsync(appointmentToDelete.id);
        toast({
          title: "Agendamento cancelado",
          description: "O agendamento foi cancelado com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível cancelar o agendamento. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setDeleteDialogOpen(false);
        setAppointmentToDelete(null);
      }
    }
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
          {professionalsLoading || appointmentsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Carregando agenda...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className={`grid grid-cols-[100px_repeat(${professionals.length},1fr)] gap-2 min-w-[600px]`}>
                {/* Header */}
                <div className="p-3 font-medium text-center border-b">Horário</div>
                {professionals.map(prof => (
                  <div key={prof.id} className="p-3 text-center border-b">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium">{prof.name}</span>
                    </div>
                  </div>
                ))}

                {/* Time Slots */}
                {timeSlots.map(time => (
                  <React.Fragment key={time}>
                    <div className="p-3 text-center font-medium text-muted-foreground border-r">
                      {time}
                    </div>
                    {professionals.map(prof => {
                      const appointment = getAppointmentForSlot(time, prof.id);
                      return (
                        <div key={`${time}-${prof.id}`} className="p-2 min-h-[60px] border-r border-b">
                          {appointment ? (
                            <div className={`relative p-2 rounded-lg text-xs ${
                              appointment.status === 'agendado' || appointment.status === 'confirmado'
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'bg-yellow-50 border border-yellow-200'
                            }`}>
                              <button
                                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
                                onClick={() => handleDeleteAppointment(appointment.id, time, prof.id)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <div className="font-medium text-foreground">{appointment.client.name}</div>
                              <div className="text-muted-foreground">
                                {appointment.services.map(s => s.name).join(', ')}
                              </div>
                              <Badge 
                                variant={appointment.status === 'confirmado' ? 'default' : 'secondary'}
                                className="mt-1 text-[10px]"
                              >
                                {appointment.status === 'confirmado' ? 'Confirmado' : 'Agendado'}
                              </Badge>
                            </div>
                          ) : (
                            <div 
                              className="h-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                              onClick={() => handleNewAppointmentClick(time, prof.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Novo Agendamento */}
      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        prefilledData={prefilledAppointmentData}
      />

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
            <AlertDialogAction 
              onClick={confirmDeleteAppointment} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteAppointmentMutation.isPending}
            >
              {deleteAppointmentMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelando...
                </>
              ) : (
                'Confirmar Exclusão'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
