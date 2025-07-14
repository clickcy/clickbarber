import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Phone, Mail, Calendar, Filter } from "lucide-react";
import ClientModal from "@/components/ClientModal";
import { useToast } from "@/hooks/use-toast";
type ModalClient = {
  id?: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  cpf: string;
  birth_date: string;
  gender: string;
};
interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
  status: string;
  cpf?: string;
  birth_date?: string;
  gender?: string;
}
const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ModalClient | null>(null);
  const [clients, setClients] = useState<Client[]>([{
    id: 1,
    name: "Carlos Alberto Silva",
    phone: "(11) 99999-1234",
    email: "carlos@email.com",
    lastVisit: "2024-01-15",
    totalVisits: 15,
    status: "Ativo"
  }, {
    id: 2,
    name: "Roberto Santos",
    phone: "(11) 88888-5678",
    email: "roberto@email.com",
    lastVisit: "2024-01-10",
    totalVisits: 8,
    status: "Ativo"
  }, {
    id: 3,
    name: "José Lima",
    phone: "(11) 77777-9012",
    email: "jose@email.com",
    lastVisit: "2023-12-20",
    totalVisits: 3,
    status: "Inativo"
  }, {
    id: 4,
    name: "André Costa",
    phone: "(11) 66666-3456",
    email: "andre@email.com",
    lastVisit: "2024-01-12",
    totalVisits: 22,
    status: "VIP"
  }]);
  const {
    toast
  } = useToast();
  const filteredClients = clients.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm) || client.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Ativo":
        return "default";
      case "VIP":
        return "secondary";
      case "Inativo":
        return "outline";
      default:
        return "outline";
    }
  };
  const handleNewClient = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };
  const handleEditClient = (client: Client) => {
    // Mapear do formato da página para o formato do modal
    const modalClient = {
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      status: client.status,
      cpf: client.cpf || "",
      birth_date: client.birth_date || "",
      gender: client.gender || ""
    };
    setEditingClient(modalClient as any);
    setIsModalOpen(true);
  };
  const handleSaveClient = (clientData: any) => {
    if (clientData.id) {
      // Editando cliente existente
      setClients(prev => prev.map(c => c.id === clientData.id ? {
        ...c,
        name: clientData.name,
        phone: clientData.phone,
        email: clientData.email,
        status: clientData.status,
        cpf: clientData.cpf,
        birth_date: clientData.birth_date,
        gender: clientData.gender
      } : c));
      toast({
        title: "Cliente atualizado",
        description: "As informações do cliente foram atualizadas com sucesso."
      });
    } else {
      // Criando novo cliente
      const newClient: Client = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        name: clientData.name,
        phone: clientData.phone,
        email: clientData.email,
        status: clientData.status,
        cpf: clientData.cpf,
        birth_date: clientData.birth_date,
        gender: clientData.gender,
        lastVisit: new Date().toISOString().split('T')[0],
        totalVisits: 0
      };
      setClients(prev => [...prev, newClient]);
      toast({
        title: "Cliente cadastrado",
        description: "Novo cliente foi cadastrado com sucesso."
      });
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          
        </div>
        <Button className="gradient-bg hover:opacity-90" onClick={handleNewClient}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, telefone ou email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead>Total Visitas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map(client => <TableRow key={client.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(client.lastVisit)}
                      </div>
                    </TableCell>
                    <TableCell>{client.totalVisits}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>

          {filteredClients.length === 0 && <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
            </div>}
        </CardContent>
      </Card>

      {/* Modal de Cliente */}
      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveClient} editingClient={editingClient} />
    </div>;
};
export default Clients;