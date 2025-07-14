import React, { useState, useEffect } from "react";

interface CurrentTimeIndicatorProps {
  timeSlots: string[];
}

export const CurrentTimeIndicator: React.FC<CurrentTimeIndicatorProps> = ({ timeSlots }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePosition = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Verifica se a hora atual está dentro do horário de funcionamento (8h às 18h)
    if (currentHour < 8 || currentHour >= 19) {
      return null;
    }

    // Calcula a posição relativa dentro da agenda
    const startHour = 8;
    const totalMinutesFromStart = (currentHour - startHour) * 60 + currentMinutes;
    const totalAgendaMinutes = 11 * 60; // 11 horas (8h às 18h)
    
    // Posição em porcentagem (considerando header)
    const position = (totalMinutesFromStart / totalAgendaMinutes) * 100;
    
    return position;
  };

  const position = getCurrentTimePosition();

  if (!position) return null;

  return (
    <div 
      className="absolute left-0 right-0 z-10 pointer-events-none"
      style={{ 
        top: `calc(${position}% + 60px)`, // Offset para compensar o header
      }}
    >
      <div className="flex items-center">
        <div className="w-16 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-l text-center font-medium">
          {currentTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        <div className="flex-1 h-0.5 bg-destructive"></div>
      </div>
    </div>
  );
};