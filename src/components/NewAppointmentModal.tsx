
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";

interface Service {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
}

interface Professional {
  id: number;
  name: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledData?: {
    date: Date;
    time: string;
    professionalId: number;
  };
  editingAppointment?: {
    time: string;
    professional: number;
    client: string;
    service: string;
    status: string;
  };
}

// Mock data - em produção virá do Supabase
const mockServices: Service[] = [
  { id: 1, name: "Corte", duration_minutes: 30, price: 25 },
  { id: 2, name: "Barba", duration_minutes: 20, price: 15 },
  { id: 3, name: "Corte + Barba", duration_minutes: 45, price: 35 },
  { id: 4, name: "Hidratação", duration_minutes: 40, price: 30 },
];

const mockProfessionals: Professional[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Pedro Costa" },
];

const mockClients: Client[] = [
  { id: 1, name: "Carlos Alberto", phone: "(11) 99999-1111", email: "carlos@email.com" },
  { id: 2, name: "Roberto Silva", phone: "(11) 99999-2222", email: "roberto@email.com" },
  { id: 3, name: "José Santos", phone: "(11) 99999-3333", email: "jose@email.com" },
];

const NewAppointmentModal = ({ isOpen, onClose, prefilledData, editingAppointment }: NewAppointmentModalProps) => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [observations, setObservations] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  // Calcular duração total dos serviços
  const totalDuration = selectedServices.reduce((total, service) => total + service.duration_minutes, 0);

  // Pré-preencher campos quando modal abrir
  useEffect(() => {
    if (prefilledData && isOpen) {
      setDate(format(prefilledData.date, "yyyy-MM-dd"));
      setTime(prefilledData.time);
      setSelectedProfessional(prefilledData.professionalId.toString());
    }
    
    // Pré-preencher campos para edição
    if (editingAppointment && isOpen) {
      setTime(editingAppointment.time);
      setSelectedProfessional(editingAppointment.professional.toString());
      setClientSearch(editingAppointment.client);
      setSelectedClient(mockClients.find(c => c.name === editingAppointment.client)?.id.toString() || "");
      
      // Encontrar serviço baseado no nome
      const service = mockServices.find(s => s.name === editingAppointment.service);
      if (service) {
        setSelectedServices([service]);
      }
    }
  }, [prefilledData, editingAppointment, isOpen]);

  // Resetar form ao fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedServices([]);
      setSelectedClient("");
      setObservations("");
      setClientSearch("");
      setDate("");
      setTime("");
      setSelectedProfessional("");
    }
  }, [isOpen]);

  const addService = (serviceId: string) => {
    const service = mockServices.find(s => s.id.toString() === serviceId);
    if (service && !selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId: number) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const handleSubmit = () => {
    // Validação básica
    if (!selectedClient || !selectedProfessional || selectedServices.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Aqui faria a chamada para o Supabase
    console.log("Dados do agendamento:", {
      date,
      time,
      professional: selectedProfessional,
      client: selectedClient,
      services: selectedServices,
      observations,
      totalDuration
    });

    // Fechar modal
    onClose();
  };

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.phone.includes(clientSearch)
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAppointment ? 'Editar Agendamento' : 'Agendar novo horário'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Dia */}
            <div className="space-y-2">
              <Label htmlFor="date">Dia</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Hora Início */}
            <div className="space-y-2">
              <Label htmlFor="time">Hora Início</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Profissional */}
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

          {/* Serviços */}
          <div className="space-y-2">
            <Label>Serviços</Label>
            <div className="flex gap-2">
              <Select onValueChange={addService}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map(service => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name} - {service.duration_minutes}min - R$ {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Serviços Selecionados */}
            {selectedServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedServices.map(service => (
                  <Badge key={service.id} variant="secondary" className="flex items-center gap-2">
                    {service.name} ({service.duration_minutes}min)
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeService(service.id)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Duração */}
          <div className="space-y-2">
            <Label>Duração</Label>
            <Input
              value={totalDuration > 0 ? `${totalDuration} minutos` : ""}
              disabled
              placeholder="Duração será calculada automaticamente"
            />
          </div>

          {/* Cliente */}
          <div className="space-y-2">
            <Label>Cliente</Label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                placeholder="Buscar cliente por nome ou telefone"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowNewClientModal(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Lista de clientes filtrados */}
            {clientSearch && (
              <div className="border rounded-md max-h-32 overflow-y-auto">
                {filteredClients.map(client => (
                  <div
                    key={client.id}
                    className={`p-2 cursor-pointer hover:bg-muted ${selectedClient === client.id.toString() ? 'bg-primary/10' : ''}`}
                    onClick={() => {
                      setSelectedClient(client.id.toString());
                      setClientSearch(client.name);
                    }}
                  >
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.phone}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Notas adicionais sobre o agendamento..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>

          {/* Botão Agendar */}
          <Button onClick={handleSubmit} className="w-full mt-4">
            {editingAppointment ? 'SALVAR ALTERAÇÕES' : 'AGENDAR'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal de Novo Cliente - placeholder */}
      <Dialog open={showNewClientModal} onOpenChange={setShowNewClientModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro Rápido de Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Nome completo" />
            <Input placeholder="Telefone" />
            <Input placeholder="E-mail (opcional)" />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowNewClientModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewClientModal(false)}>
                Cadastrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewAppointmentModal;
