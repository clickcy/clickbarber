import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calendar, Clock, Users, DollarSign, TrendingUp, Plus, X } from "lucide-react";
import NewAppointmentModal from "@/components/NewAppointmentModal";
import { DateNavigation } from "@/components/DateNavigation";
import { AppointmentTooltip } from "@/components/AppointmentTooltip";
import { CurrentTimeIndicator } from "@/components/CurrentTimeIndicator";
const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [prefilledAppointmentData, setPrefilledAppointmentData] = useState<{
    date: Date;
    time: string;
    professionalId: number;
  } | undefined>();
  const [editingAppointment, setEditingAppointment] = useState<{
    time: string;
    professional: number;
    client: string;
    service: string;
    status: string;
  } | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<{
    time: string;
    professionalId: number;
  } | null>(null);

  // Dados mockados para demonstração
  const todayStats = {
    appointments: 12,
    clients: 8,
    revenue: 850,
    growth: 15
  };
  const timeSlots = Array.from({
    length: 11
  }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  const professionals = [{
    id: 1,
    name: "João Silva",
    avatar: "JS"
  }, {
    id: 2,
    name: "Maria Santos",
    avatar: "MS"
  }, {
    id: 3,
    name: "Pedro Costa",
    avatar: "PC"
  }];
  // Serviços disponíveis com durações
  const services = {
    "Corte": { duration: 30, price: 25 },
    "Barba": { duration: 20, price: 15 },
    "Corte + Barba": { duration: 45, price: 35 },
    "Hidratação": { duration: 40, price: 30 },
  };

  const mockAppointments = [{
    time: "09:00",
    professional: 1,
    client: "Carlos Alberto",
    service: "Corte + Barba",
    status: "confirmed",
    duration: 45
  }, {
    time: "10:30",
    professional: 2,
    client: "Roberto Silva",
    service: "Corte",
    status: "confirmed",
    duration: 30
  }, {
    time: "14:00",
    professional: 1,
    client: "José Santos",
    service: "Barba",
    status: "pending",
    duration: 20
  }, {
    time: "15:30",
    professional: 3,
    client: "André Lima",
    service: "Corte + Barba",
    status: "confirmed",
    duration: 45
  }];
  // Função para converter hora para minutos
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Função para converter minutos para hora
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Função para verificar se um agendamento ocupa um slot específico
  const getAppointmentForSlot = (time: string, professionalId: number) => {
    const slotMinutes = timeToMinutes(time);
    
    return mockAppointments.find(apt => {
      if (apt.professional !== professionalId) return false;
      
      const aptStartMinutes = timeToMinutes(apt.time);
      const aptEndMinutes = aptStartMinutes + apt.duration;
      
      // Verifica se o slot está dentro do período do agendamento
      return slotMinutes >= aptStartMinutes && slotMinutes < aptEndMinutes;
    });
  };

  // Função para verificar se um slot está parcialmente ocupado
  const getSlotOccupancy = (time: string, professionalId: number) => {
    const slotMinutes = timeToMinutes(time);
    const slotEndMinutes = slotMinutes + 60; // Cada slot tem 1 hora
    
    const appointment = mockAppointments.find(apt => {
      if (apt.professional !== professionalId) return null;
      
      const aptStartMinutes = timeToMinutes(apt.time);
      const aptEndMinutes = aptStartMinutes + apt.duration;
      
      // Verifica se há sobreposição
      return aptStartMinutes < slotEndMinutes && aptEndMinutes > slotMinutes;
    });

    if (!appointment) return { type: 'empty', appointment: null, availableTime: 60 };

    const aptStartMinutes = timeToMinutes(appointment.time);
    const aptEndMinutes = aptStartMinutes + appointment.duration;

    // Calcula quanto tempo está ocupado neste slot
    const occupiedStart = Math.max(slotMinutes, aptStartMinutes);
    const occupiedEnd = Math.min(slotEndMinutes, aptEndMinutes);
    const occupiedTime = occupiedEnd - occupiedStart;
    const availableTime = 60 - occupiedTime;

    // Determina se é o início do agendamento
    const isStart = aptStartMinutes >= slotMinutes && aptStartMinutes < slotEndMinutes;

    if (availableTime === 0) {
      return { type: 'full', appointment, availableTime: 0, isStart };
    } else if (availableTime > 0) {
      return { type: 'partial', appointment, availableTime, isStart, occupiedTime };
    }

    return { type: 'empty', appointment: null, availableTime: 60 };
  };
  const handleNewAppointmentClick = (time: string, professionalId: number) => {
    setPrefilledAppointmentData({
      date: selectedDate,
      time,
      professionalId
    });
    setIsNewAppointmentModalOpen(true);
  };
  const handleNewAppointmentFromButton = () => {
    setPrefilledAppointmentData(undefined);
    setEditingAppointment(undefined);
    setIsNewAppointmentModalOpen(true);
  };
  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment({
      time: appointment.time,
      professional: appointment.professional,
      client: appointment.client,
      service: appointment.service,
      status: appointment.status
    });
    setPrefilledAppointmentData(undefined);
    setIsNewAppointmentModalOpen(true);
  };
  const handleDeleteAppointment = (time: string, professionalId: number) => {
    setAppointmentToDelete({
      time,
      professionalId
    });
    setDeleteDialogOpen(true);
  };
  const confirmDeleteAppointment = () => {
    if (appointmentToDelete) {
      // Aqui faria a chamada para o Supabase para deletar o agendamento
      console.log("Deletando agendamento:", appointmentToDelete);

      // Por enquanto, vamos apenas simular a remoção localmente
      // Em produção, seria necessário atualizar o estado dos agendamentos

      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div>
        
      </div>


      {/* Agenda Grid */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>Agenda do Dia</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex flex-col items-start">
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                </p>
                <DateNavigation selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </div>
              <Button className="gradient-bg hover:opacity-90" onClick={handleNewAppointmentFromButton}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="relative">
              <CurrentTimeIndicator timeSlots={timeSlots} />
              <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-2 min-w-[600px]">
              {/* Header */}
              <div className="p-3 font-medium text-center border-b">Horário</div>
              {professionals.map(prof => <div key={prof.id} className="p-3 text-center border-b">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {prof.avatar}
                    </div>
                    <span className="font-medium">{prof.name}</span>
                  </div>
                </div>)}

              {/* Time Slots */}
              {timeSlots.map(time => <React.Fragment key={time}>
                  <div className="p-3 text-center font-medium text-muted-foreground border-r">
                    {time}
                  </div>
                  {professionals.map(prof => {
                  const slotInfo = getSlotOccupancy(time, prof.id);
                  
                  return <div key={`${time}-${prof.id}`} className="relative border-r border-b time-slot" style={{ minHeight: '60px' }}>
                        {slotInfo.type === 'empty' ? (
                          // Slot completamente vazio
                          <div className="h-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer transition-colors hover-scale p-2" onClick={() => handleNewAppointmentClick(time, prof.id)}>
                            <Plus className="h-4 w-4" />
                          </div>
                        ) : slotInfo.type === 'full' ? (
                          // Slot completamente ocupado
                          slotInfo.isStart ? (
                            <AppointmentTooltip appointment={slotInfo.appointment}>
                              <div 
                                className={`appointment-block relative p-2 rounded-lg text-xs cursor-pointer hover-scale ${slotInfo.appointment.status === 'confirmed' ? 'bg-primary/10 border border-primary/20' : 'bg-yellow-50 border border-yellow-200'}`}
                                style={{ 
                                  height: `${Math.ceil(slotInfo.appointment.duration / 60) * 60}px`,
                                  zIndex: 10
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  handleEditAppointment(slotInfo.appointment);
                                }}
                              >
                                <button 
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors hover-scale z-20" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAppointment(slotInfo.appointment.time, prof.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                                <div className="font-medium text-foreground">{slotInfo.appointment.client}</div>
                                <div className="text-muted-foreground">{slotInfo.appointment.service}</div>
                                <div className="text-xs text-muted-foreground mt-1">{slotInfo.appointment.duration}min</div>
                              </div>
                            </AppointmentTooltip>
                          ) : (
                            // Continuação de um agendamento (não renderiza nada visível)
                            <div className="h-full bg-primary/5 border-l-2 border-primary/30"></div>
                          )
                        ) : (
                          // Slot parcialmente ocupado
                          <div className="h-full flex flex-col">
                            {slotInfo.isStart && (
                              <AppointmentTooltip appointment={slotInfo.appointment}>
                                <div 
                                  className={`appointment-block relative p-1 rounded text-xs cursor-pointer hover-scale ${slotInfo.appointment.status === 'confirmed' ? 'bg-primary/10 border border-primary/20' : 'bg-yellow-50 border border-yellow-200'}`}
                                  style={{ 
                                    height: `${slotInfo.occupiedTime}px`,
                                    minHeight: '30px'
                                  }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleEditAppointment(slotInfo.appointment);
                                  }}
                                >
                                  <button 
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors text-xs z-20" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteAppointment(slotInfo.appointment.time, prof.id);
                                    }}
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                  <div className="font-medium text-foreground leading-tight">{slotInfo.appointment.client}</div>
                                  <div className="text-muted-foreground text-xs">{slotInfo.appointment.service}</div>
                                </div>
                              </AppointmentTooltip>
                            )}
                            
                            {slotInfo.availableTime > 0 && (
                              <div 
                                className="flex-1 flex items-center justify-center text-muted-foreground hover:bg-green-50 border border-dashed border-green-300 rounded cursor-pointer transition-colors hover-scale bg-green-50/30"
                                style={{ 
                                  minHeight: `${slotInfo.availableTime}px`,
                                  height: `${slotInfo.availableTime}px`
                                }}
                                onClick={() => handleNewAppointmentClick(time, prof.id)}
                              >
                                <div className="text-center">
                                  <Plus className="h-3 w-3 mx-auto mb-1" />
                                  <div className="text-xs">{slotInfo.availableTime}min</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>;
                })}
                </React.Fragment>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Novo Agendamento */}
      <NewAppointmentModal isOpen={isNewAppointmentModalOpen} onClose={() => {
      setIsNewAppointmentModalOpen(false);
      setEditingAppointment(undefined);
      setPrefilledAppointmentData(undefined);
    }} prefilledData={prefilledAppointmentData} editingAppointment={editingAppointment} />

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
            <AlertDialogAction onClick={confirmDeleteAppointment} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirmar Exclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default Dashboard;