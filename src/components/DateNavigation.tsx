import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateNavigationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateDate('prev')}
        className="h-8 w-8 p-0 hover-scale"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal hover-scale",
              "min-w-[140px]"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedDate, "dd/MM/yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateDate('next')}
        className="h-8 w-8 p-0 hover-scale"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};