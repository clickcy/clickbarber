import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, User, Phone, Mail, MapPin, FileText } from "lucide-react";

interface AppointmentTooltipProps {
  children: React.ReactNode;
  appointment: {
    id: string;
    start_time: string;
    end_time: string;
    status: string;
    notes?: string | null;
    client: {
      name: string;
      phone?: string | null;
      email?: string | null;
    };
    services: Array<{
      name: string;
      duration_minutes: number;
      price: number;
    }>;
    professional: {
      name: string;
    };
  };
}

const AppointmentTooltip: React.FC<AppointmentTooltipProps> = ({ children, appointment }) => {
  const startTime = new Date(appointment.start_time);
  const endTime = new Date(appointment.end_time);
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  const totalValue = appointment.services.reduce((sum, service) => sum + service.price, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-500 text-white';
      case 'agendado':
        return 'bg-blue-500 text-white';
      case 'concluido':
        return 'bg-gray-500 text-white';
      case 'cancelado':
        return 'bg-red-500 text-white';
      case 'nao_compareceu':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'agendado':
        return 'Agendado';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      case 'nao_compareceu':
        return 'Não Compareceu';
      default:
        return status;
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{appointment.client.name}</h4>
              <p className="text-sm text-muted-foreground">{appointment.professional.name}</p>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {getStatusLabel(appointment.status)}
            </Badge>
          </div>

          {/* Horário */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(startTime, "HH:mm", { locale: ptBR })} - {format(endTime, "HH:mm", { locale: ptBR })}
            </span>
            <span className="text-muted-foreground">({duration} min)</span>
          </div>

          {/* Serviços */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Serviços:</h5>
            {appointment.services.map((service, index) => (
              <div key={index} className="flex justify-between items-center text-sm bg-muted/30 rounded p-2">
                <span>{service.name}</span>
                <div className="text-right">
                  <div>R$ {service.price.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{service.duration_minutes} min</div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center font-medium text-sm pt-2 border-t">
              <span>Total:</span>
              <span>R$ {totalValue.toFixed(2)}</span>
            </div>
          </div>

          {/* Contato do Cliente */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm">Contato:</h5>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.client.name}</span>
              </div>
              {appointment.client.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.client.phone}</span>
                </div>
              )}
              {appointment.client.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.client.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Observações */}
          {appointment.notes && (
            <div className="space-y-2">
              <h5 className="font-medium text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Observações:
              </h5>
              <p className="text-sm text-muted-foreground bg-muted/30 rounded p-2">
                {appointment.notes}
              </p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AppointmentTooltip;