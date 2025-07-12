
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Star, Calendar, DollarSign, Users } from "lucide-react";

const Professionals = () => {
  // Dados mockados para demonstração
  const mockProfessionals = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@clickbarber.com",
      phone: "(11) 99999-1234",
      specialties: ["Corte Masculino", "Barba", "Bigode"],
      rating: 4.8,
      appointmentsToday: 8,
      monthlyRevenue: 4500,
      totalClients: 156,
      status: "Ativo",
      avatar: "/api/placeholder/150/150",
      commission: 60
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@clickbarber.com", 
      phone: "(11) 88888-5678",
      specialties: ["Corte Feminino", "Coloração", "Tratamentos"],
      rating: 4.9,
      appointmentsToday: 6,
      monthlyRevenue: 5200,
      totalClients: 198,
      status: "Ativo", 
      avatar: "/api/placeholder/150/150",
      commission: 65
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@clickbarber.com",
      phone: "(11) 77777-9012", 
      specialties: ["Corte Infantil", "Penteados"],
      rating: 4.7,
      appointmentsToday: 4,
      monthlyRevenue: 3200,
      totalClients: 89,
      status: "Inativo",
      avatar: "/api/placeholder/150/150", 
      commission: 55
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profissionais</h1>
          <p className="text-muted-foreground">Gerencie sua equipe de profissionais</p>
        </div>
        <Button className="gradient-bg hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Profissional
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockProfessionals.length}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profissionais Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockProfessionals.filter(p => p.status === "Ativo").length}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockProfessionals.reduce((acc, p) => acc + p.appointmentsToday, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {(mockProfessionals.reduce((acc, p) => acc + p.rating, 0) / mockProfessionals.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProfessionals.map((professional) => (
          <Card key={professional.id} className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={professional.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{professional.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={professional.status === "Ativo" ? "default" : "secondary"}>
                  {professional.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">{professional.email}</p>
                <p className="text-muted-foreground">{professional.phone}</p>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {professional.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg font-bold text-primary">{professional.appointmentsToday}</div>
                  <div className="text-xs text-muted-foreground">Hoje</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary">R$ {professional.monthlyRevenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Mês</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg font-bold text-primary">{professional.totalClients}</div>
                  <div className="text-xs text-muted-foreground">Clientes</div>
                </div>
              </div>

              {/* Commission */}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Comissão:</span>
                  <span className="font-medium">{professional.commission}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Agenda
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Professionals;
