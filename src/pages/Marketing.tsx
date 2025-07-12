
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Users, 
  Calendar,
  Bell,
  Smartphone,
  Mail,
  Star,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

const Marketing = () => {
  const [autoReminders, setAutoReminders] = useState(true);
  const [birthdayMessages, setBirthdayMessages] = useState(true);

  // Dados mockados
  const reminderStats = {
    sent: 145,
    delivered: 142,
    responded: 89,
    cancelled: 12
  };

  const upcomingAppointments = [
    { id: 1, client: "Carlos Silva", phone: "(11) 99999-1234", service: "Corte + Barba", time: "14:00", date: "Amanhã" },
    { id: 2, client: "Roberto Santos", phone: "(11) 88888-5678", service: "Corte", time: "15:30", date: "Amanhã" },
    { id: 3, client: "José Lima", phone: "(11) 77777-9012", service: "Barba", time: "16:00", date: "Amanhã" }
  ];

  const campaignTemplates = [
    {
      id: 1,
      name: "Lembrete de Agendamento",
      type: "reminder",
      message: "Olá {CLIENTE}! Lembramos que você tem um agendamento amanhã às {HORARIO} para {SERVICO}. Confirme sua presença respondendo SIM.",
      active: true
    },
    {
      id: 2, 
      name: "Promoção de Aniversário",
      type: "birthday",
      message: "🎉 Parabéns, {CLIENTE}! No seu aniversário, ganhe 20% de desconto em qualquer serviço. Válido até {DATA}.",
      active: true
    },
    {
      id: 3,
      name: "Retorno de Cliente",
      type: "retention",
      message: "Sentimos sua falta, {CLIENTE}! Que tal agendar um novo corte? Temos horários disponíveis esta semana.",
      active: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing & Comunicação</h1>
          <p className="text-muted-foreground">Automação de lembretes e campanhas de marketing</p>
        </div>
        <Button className="gradient-bg hover:opacity-90">
          <Send className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{reminderStats.sent}</div>
            <div className="text-sm text-muted-foreground">Este mês</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {((reminderStats.delivered / reminderStats.sent) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">{reminderStats.delivered} entregues</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {((reminderStats.responded / reminderStats.delivered) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">{reminderStats.responded} respostas</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{reminderStats.cancelled}</div>
            <div className="text-sm text-muted-foreground">
              {((reminderStats.cancelled / reminderStats.sent) * 100).toFixed(1)}% do total
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reminders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reminders">Lembretes Automáticos</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Reminders Tab */}
        <TabsContent value="reminders" className="space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Lembretes
              </CardTitle>
              <CardDescription>
                Configure quando e como os lembretes automáticos são enviados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Lembretes Automáticos</div>
                  <div className="text-sm text-muted-foreground">
                    Enviar lembretes 24h antes dos agendamentos
                  </div>
                </div>
                <Switch
                  checked={autoReminders}
                  onCheckedChange={setAutoReminders}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Mensagens de Aniversário</div>
                  <div className="text-sm text-muted-foreground">
                    Enviar mensagens especiais no aniversário dos clientes
                  </div>
                </div>
                <Switch
                  checked={birthdayMessages}
                  onCheckedChange={setBirthdayMessages}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horário de Envio</label>
                  <Input type="time" defaultValue="10:00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dias de Antecedência</label>
                  <Input type="number" defaultValue="1" min="1" max="7" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Lembretes</CardTitle>
              <CardDescription>Agendamentos que receberão lembretes automaticamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Smartphone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{appointment.client}</div>
                        <div className="text-sm text-muted-foreground">{appointment.phone}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{appointment.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.date} às {appointment.time}
                      </div>
                    </div>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      Aguardando
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Campaign */}
            <Card>
              <CardHeader>
                <CardTitle>Nova Campanha</CardTitle>
                <CardDescription>Crie e envie campanhas personalizadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome da Campanha</label>
                  <Input placeholder="Ex: Promoção de Verão" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Público Alvo</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>Todos os clientes</option>
                    <option>Clientes ativos</option>
                    <option>Clientes inativos</option>
                    <option>Clientes VIP</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea 
                    placeholder="Digite sua mensagem aqui..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data de Envio</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Horário</label>
                    <Input type="time" defaultValue="10:00" />
                  </div>
                </div>

                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Campanha
                </Button>
              </CardContent>
            </Card>

            {/* Campaign Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Campanhas</CardTitle>
                <CardDescription>Performance das últimas campanhas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Promoção Black Friday</div>
                      <div className="text-sm text-muted-foreground">Enviada há 2 dias</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="font-medium text-primary">156</span> enviadas
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-green-500">89%</span> entregues
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Volta às Aulas</div>
                      <div className="text-sm text-muted-foreground">Enviada há 1 semana</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="font-medium text-primary">203</span> enviadas
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-green-500">92%</span> entregues
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Dia dos Pais</div>
                      <div className="text-sm text-muted-foreground">Enviada há 2 semanas</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="font-medium text-primary">178</span> enviadas
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-green-500">94%</span> entregues
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Mensagem</CardTitle>
              <CardDescription>Gerencie os templates utilizados nas suas comunicações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignTemplates.map(template => (
                  <div key={template.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <Switch
                        checked={template.active}
                        onCheckedChange={() => {}}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      "{template.message}"
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm">Duplicar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
