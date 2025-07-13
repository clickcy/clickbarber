import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfDay, endOfDay } from "date-fns";

export interface AppointmentWithDetails {
  id: string;
  start_time: string;
  end_time: string;
  notes?: string;
  status: string;
  client: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
  };
  professional: {
    id: string;
    name: string;
  };
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
  }>;
}

export interface CreateAppointmentData {
  client_id: string;
  professional_id: string;
  start_time: string;
  end_time: string;
  notes?: string;
  service_ids: string[];
}

export const useAppointments = (date?: Date) => {
  return useQuery({
    queryKey: ["appointments", date ? format(date, "yyyy-MM-dd") : "all"],
    queryFn: async () => {
      let query = supabase
        .from("appointments")
        .select(`
          *,
          client:clients(*),
          professional:professionals(*),
          appointment_services(
            service:services(*)
          )
        `);

      if (date) {
        const startDate = startOfDay(date).toISOString();
        const endDate = endOfDay(date).toISOString();
        query = query.gte("start_time", startDate).lte("start_time", endDate);
      }

      const { data, error } = await query.order("start_time");

      if (error) throw error;

      return data?.map((appointment): AppointmentWithDetails => ({
        id: appointment.id,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
        notes: appointment.notes,
        status: appointment.status,
        client: appointment.client,
        professional: appointment.professional,
        services: appointment.appointment_services?.map((as: any) => as.service) || []
      })) || [];
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentData) => {
      // Criar agendamento
      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          client_id: data.client_id,
          professional_id: data.professional_id,
          start_time: data.start_time,
          end_time: data.end_time,
          notes: data.notes,
        })
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      // Criar relacionamentos com serviços
      if (data.service_ids.length > 0) {
        const { error: servicesError } = await supabase
          .from("appointment_services")
          .insert(
            data.service_ids.map((service_id) => ({
              appointment_id: appointment.id,
              service_id,
            }))
          );

        if (servicesError) throw servicesError;
      }

      return appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId: string) => {
      // Primeiro deletar relacionamentos
      const { error: servicesError } = await supabase
        .from("appointment_services")
        .delete()
        .eq("appointment_id", appointmentId);

      if (servicesError) throw servicesError;

      // Depois deletar agendamento
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useTodayStats = () => {
  return useQuery({
    queryKey: ["today-stats"],
    queryFn: async () => {
      const today = new Date();
      const startDate = startOfDay(today).toISOString();
      const endDate = endOfDay(today).toISOString();

      // Buscar agendamentos de hoje
      const { data: appointments, error: appointmentsError } = await supabase
        .from("appointments")
        .select(`
          *,
          appointment_services(
            service:services(price)
          )
        `)
        .gte("start_time", startDate)
        .lte("start_time", endDate);

      if (appointmentsError) throw appointmentsError;

      const totalAppointments = appointments?.length || 0;
      const uniqueClients = new Set(appointments?.map(a => a.client_id)).size;
      
      const revenue = appointments?.reduce((total, appointment) => {
        const servicesRevenue = appointment.appointment_services?.reduce((serviceTotal: number, as: any) => {
          return serviceTotal + (as.service?.price || 0);
        }, 0) || 0;
        return total + servicesRevenue;
      }, 0) || 0;

      return {
        appointments: totalAppointments,
        clients: uniqueClients,
        revenue,
        growth: 15 // Placeholder - implementar cálculo real baseado em dados históricos
      };
    },
  });
};