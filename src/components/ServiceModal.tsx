import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: number;
  name: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: {
    type: 'service';
    name: string;
    price: number;
    quantity: number;
    professional?: Professional;
    datetime?: Date;
  }) => void;
}

// Mock data
const mockServices: Service[] = [
  { id: 1, name: "Corte", price: 25.00, duration: 30 },
  { id: 2, name: "Barba", price: 15.00, duration: 20 },
  { id: 3, name: "Corte + Barba", price: 35.00, duration: 45 },
  { id: 4, name: "Hidratação", price: 30.00, duration: 40 }
];

const mockProfessionals: Professional[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Pedro Costa" }
];

export const ServiceModal = ({ isOpen, onClose, onAddItem }: ServiceModalProps) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const selectedServiceData = mockServices.find(s => s.id.toString() === selectedService);

  const handleAdd = () => {
    if (!selectedService) {
      alert("Selecione um serviço");
      return;
    }

    if (!selectedProfessional) {
      alert("Selecione um profissional");
      return;
    }

    if (!date || !time) {
      alert("Defina data e hora");
      return;
    }

    const service = mockServices.find(s => s.id.toString() === selectedService);
    const professional = mockProfessionals.find(p => p.id.toString() === selectedProfessional);

    if (!service || !professional) return;

    const datetime = new Date(`${date}T${time}`);

    onAddItem({
      type: 'service',
      name: service.name,
      price: service.price,
      quantity: 1, // Services are always quantity 1
      professional,
      datetime
    });

    // Reset form
    setSelectedService("");
    setSelectedProfessional("");
    setDate("");
    setTime("");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Serviço</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Serviço</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {mockServices.map(service => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name} - R$ {service.price.toFixed(2)} ({service.duration}min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Profissional</Label>
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um profissional" />
              </SelectTrigger>
              <SelectContent>
                {mockProfessionals.map(prof => (
                  <SelectItem key={prof.id} value={prof.id.toString()}>
                    {prof.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Hora</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {selectedServiceData && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm">
                <div className="font-medium">Preço: R$ {selectedServiceData.price.toFixed(2)}</div>
                <div className="text-muted-foreground">Duração: {selectedServiceData.duration} minutos</div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleAdd} className="flex-1">
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};