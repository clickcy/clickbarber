import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Client {
  id?: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  cpf: string;
  birth_date: string;
  gender: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
  editingClient?: Client | null;
}

const ClientModal = ({ isOpen, onClose, onSave, editingClient }: ClientModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [gender, setGender] = useState("");

  // Preencher campos quando editando
  useEffect(() => {
    if (editingClient) {
      setName(editingClient.name);
      setPhone(editingClient.phone);
      setEmail(editingClient.email);
      setStatus(editingClient.status);
      setCpf(editingClient.cpf || "");
      setBirthDate(editingClient.birth_date ? new Date(editingClient.birth_date) : undefined);
      setGender(editingClient.gender || "");
    }
  }, [editingClient, isOpen]);

  // Limpar campos quando modal fechar
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPhone("");
      setEmail("");
      setStatus("Ativo");
      setCpf("");
      setBirthDate(undefined);
      setGender("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      return;
    }

    const clientData: Client = {
      id: editingClient?.id,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      status,
      cpf: cpf.trim(),
      birth_date: birthDate ? format(birthDate, "yyyy-MM-dd") : "",
      gender,
    };

    onSave(clientData);
    onClose();
  };

  const isEditing = !!editingClient;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {isEditing ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Atualize as informações do cliente."
              : "Preencha os dados para cadastrar um novo cliente."
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[50vh]">
          <div className="grid gap-4 py-4 pr-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo do cliente"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@email.com"
            />
          </div>

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>

          {/* Data de Nascimento */}
          <div className="space-y-2">
            <Label htmlFor="birth-date">Data de Nascimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "dd/MM/yyyy") : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Sexo */}
          <div className="space-y-2">
            <Label htmlFor="gender">Sexo</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="feminino">Feminino</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="gradient-bg hover:opacity-90">
            {isEditing ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;