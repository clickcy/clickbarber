import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Scissors } from "lucide-react";

interface AppointmentData {
  time: string;
  client: string;
  service: string;
  status: string;
  professional: number;
}

interface AppointmentTooltipProps {
  appointment: AppointmentData;
  children: React.ReactNode;
}

export const AppointmentTooltip: React.FC<AppointmentTooltipProps> = ({
  appointment,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{appointment.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.client}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.service}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};