import React, { useState, useEffect } from "react";

interface CurrentTimeIndicatorProps {
  selectedDate: Date;
}

const CurrentTimeIndicator: React.FC<CurrentTimeIndicatorProps> = ({ selectedDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualizar a cada minuto

    return () => clearInterval(timer);
  }, []);

  // Verificar se é o dia atual
  const isToday = selectedDate.toDateString() === currentTime.toDateString();
  
  if (!isToday) return null;

  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Só mostrar durante horário comercial (8h-18h)
  if (currentHour < 8 || currentHour >= 18) return null;

  // Calcular posição (cada hora tem 60px)
  const minutesFromStart = (currentHour - 8) * 60 + currentMinutes;
  const topPosition = minutesFromStart;

  return (
    <div
      className="absolute left-0 right-0 z-30 pointer-events-none"
      style={{ top: `${topPosition}px` }}
    >
      {/* Linha vermelha */}
      <div className="h-0.5 bg-red-500 shadow-md relative">
        {/* Círculo no início da linha */}
        <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full shadow-md"></div>
        {/* Horário */}
        <div className="absolute -right-16 -top-2.5 bg-red-500 text-white text-xs px-2 py-0.5 rounded shadow-md font-medium">
          {currentTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentTimeIndicator;