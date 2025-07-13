
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Loader2 } from "lucide-react";
import { format, addMinutes } from "date-fns";
import { useProfessionals } from "@/hooks/useProfessionals";
import { useServices } from "@/hooks/useServices";
import { useClients, useCreateClient } from "@/hooks/useClients";
import { useCreateAppointment } from "@/hooks/useAppointments";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
}

interface Professional {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledData?: {
    date: Date;
    time: string;
    professionalId: string;
  };
}


const NewAppointmentModal = ({ isOpen, onClose, prefilledData }: NewAppointmentModalProps) => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [observations, setObservations] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");

  const { toast } = useToast();
  
  // Hooks para buscar dados
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const { data: professionals = [], isLoading: professionalsLoading } = useProfessionals();
  const { data: clients = [], isLoading: clientsLoading } = useClients(clientSearch);
  const createAppointmentMutation = useCreateAppointment();
  const createClientMutation = useCreateClient();

  // Calcular duração total dos serviços
  const totalDuration = selectedServices.reduce((total, service) => total + service.duration_minutes, 0);

  // Pré-preencher campos quando modal abrir
  useEffect(() => {
    if (prefilledData && isOpen) {
      setDate(format(prefilledData.date, "yyyy-MM-dd"));
      setTime(prefilledData.time);
      setSelectedProfessional(prefilledData.professionalId);
    }
  }, [prefilledData, isOpen]);

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
      setNewClientName("");
      setNewClientPhone("");
      setNewClientEmail("");
    }
  }, [isOpen]);

  const addService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service && !selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!selectedClient || !selectedProfessional || selectedServices.length === 0 || !date || !time) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = addMinutes(startDateTime, totalDuration);

      await createAppointmentMutation.mutateAsync({
        client_id: selectedClient,
        professional_id: selectedProfessional,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        notes: observations || undefined,
        service_ids: selectedServices.map(s => s.id),
      });

      toast({
        title: "Agendamento criado",
        description: "O agendamento foi criado com sucesso.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o agendamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleCreateClient = async () => {
    if (!newClientName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe o nome do cliente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newClient = await createClientMutation.mutateAsync({
        name: newClientName,
        phone: newClientPhone || undefined,
        email: newClientEmail || undefined,
      });

      setSelectedClient(newClient.id);
      setClientSearch(newClient.name);
      setShowNewClientModal(false);
      setNewClientName("");
      setNewClientPhone("");
      setNewClientEmail("");

      toast({
        title: "Cliente cadastrado",
        description: "O cliente foi cadastrado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o cliente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const filteredClients = clients;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agendar novo horário</DialogTitle>
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
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional} disabled={professionalsLoading}>
              <SelectTrigger>
                <SelectValue placeholder={professionalsLoading ? "Carregando..." : "Selecione um profissional"} />
              </SelectTrigger>
              <SelectContent>
                {professionals.map(prof => (
                  <SelectItem key={prof.id} value={prof.id}>
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
              <Select onValueChange={addService} disabled={servicesLoading}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={servicesLoading ? "Carregando..." : "Selecione um serviço"} />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.duration_minutes}min - R$ {service.price?.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            {clientSearch && clientSearch.length >= 2 && (
              <div className="border rounded-md max-h-32 overflow-y-auto">
                {clientsLoading ? (
                  <div className="p-2 text-center text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                  </div>
                ) : filteredClients.length > 0 ? (
                  filteredClients.map(client => (
                    <div
                      key={client.id}
                      className={`p-2 cursor-pointer hover:bg-muted ${selectedClient === client.id ? 'bg-primary/10' : ''}`}
                      onClick={() => {
                        setSelectedClient(client.id);
                        setClientSearch(client.name);
                      }}
                    >
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.phone}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-center text-muted-foreground">
                    Nenhum cliente encontrado
                  </div>
                )}
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
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-4"
            disabled={createAppointmentMutation.isPending}
          >
            {createAppointmentMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Agendando...
              </>
            ) : (
              'AGENDAR'
            )}
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
            <Input 
              placeholder="Nome completo" 
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
            />
            <Input 
              placeholder="Telefone" 
              value={newClientPhone}
              onChange={(e) => setNewClientPhone(e.target.value)}
            />
            <Input 
              placeholder="E-mail (opcional)" 
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowNewClientModal(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateClient}
                disabled={createClientMutation.isPending}
              >
                {createClientMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewAppointmentModal;
