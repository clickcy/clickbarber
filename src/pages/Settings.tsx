
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building, 
  Percent, 
  Bell, 
  Palette, 
  Upload,
  Save,
  Clock,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [establishmentData, setEstablishmentData] = useState({
    name: "ClickBarber - Barbearia Premium",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    phone: "(11) 99999-0000",
    email: "contato@clickbarber.com",
    description: "A melhor barbearia da região, com profissionais experientes e ambiente acolhedor."
  });

  const [workingHours, setWorkingHours] = useState({
    monday: { open: "08:00", close: "18:00", active: true },
    tuesday: { open: "08:00", close: "18:00", active: true },
    wednesday: { open: "08:00", close: "18:00", active: true },
    thursday: { open: "08:00", close: "18:00", active: true },
    friday: { open: "08:00", close: "18:00", active: true },
    saturday: { open: "08:00", close: "16:00", active: true },
    sunday: { open: "09:00", close: "15:00", active: false }
  });

  const [commissionRules, setCommissionRules] = useState({
    defaultServiceCommission: 60,
    defaultProductCommission: 30,
    vipClientBonus: 5,
    newClientBonus: 10
  });

  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsReminders: true,
    birthdayMessages: true,
    promotionalMessages: false
  });

  const saveSettings = () => {
    toast({
      title: "Configurações salvas!",
      description: "Todas as alterações foram salvas com sucesso."
    });
  };

  const weekDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu estabelecimento</p>
        </div>
        <Button onClick={saveSettings} className="gradient-bg hover:opacity-90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="establishment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="establishment">Estabelecimento</TabsTrigger>
          <TabsTrigger value="hours">Funcionamento</TabsTrigger>
          <TabsTrigger value="commissions">Comissões</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        {/* Establishment Tab */}
        <TabsContent value="establishment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Dados do Estabelecimento
                </CardTitle>
                <CardDescription>
                  Informações básicas da sua barbearia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Estabelecimento</Label>
                  <Input
                    id="name"
                    value={establishmentData.name}
                    onChange={(e) => setEstablishmentData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={establishmentData.address}
                    onChange={(e) => setEstablishmentData(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={establishmentData.city}
                      onChange={(e) => setEstablishmentData(prev => ({
                        ...prev,
                        city: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={establishmentData.state}
                      onChange={(e) => setEstablishmentData(prev => ({
                        ...prev,
                        state: e.target.value
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={establishmentData.zipCode}
                    onChange={(e) => setEstablishmentData(prev => ({
                      ...prev,
                      zipCode: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={establishmentData.description}
                    onChange={(e) => setEstablishmentData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact & Logo */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contato</CardTitle>
                  <CardDescription>
                    Informações de contato do estabelecimento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={establishmentData.phone}
                        onChange={(e) => setEstablishmentData(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={establishmentData.email}
                        onChange={(e) => setEstablishmentData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo do Estabelecimento</CardTitle>
                  <CardDescription>
                    Faça upload da logo da sua barbearia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder-logo.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        CB
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Alterar Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG até 2MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Working Hours Tab */}
        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horários de Funcionamento
              </CardTitle>
              <CardDescription>
                Configure os horários de funcionamento para cada dia da semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekDays.map(day => (
                  <div key={day.key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={workingHours[day.key].active}
                        onCheckedChange={(checked) => 
                          setWorkingHours(prev => ({
                            ...prev,
                            [day.key]: { ...prev[day.key], active: checked }
                          }))
                        }
                      />
                      <div className="min-w-[120px]">
                        <Label className="font-medium">{day.label}</Label>
                      </div>
                    </div>
                    
                    {workingHours[day.key].active && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          className="w-32"
                          value={workingHours[day.key].open}
                          onChange={(e) => 
                            setWorkingHours(prev => ({
                              ...prev,
                              [day.key]: { ...prev[day.key], open: e.target.value }
                            }))
                          }
                        />
                        <span className="text-muted-foreground">às</span>
                        <Input
                          type="time"
                          className="w-32"
                          value={workingHours[day.key].close}
                          onChange={(e) => 
                            setWorkingHours(prev => ({
                              ...prev,  
                              [day.key]: { ...prev[day.key], close: e.target.value }
                            }))
                          }
                        />
                      </div>
                    )}

                    {!workingHours[day.key].active && (
                      <span className="text-muted-foreground">Fechado</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commissions Tab */}
        <TabsContent value="commissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Regras de Comissão
              </CardTitle>
              <CardDescription>
                Configure as porcentagens de comissão padrão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceCommission">Comissão em Serviços (%)</Label>
                  <Input
                    id="serviceCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={commissionRules.defaultServiceCommission}
                    onChange={(e) => setCommissionRules(prev => ({
                      ...prev,
                      defaultServiceCommission: parseInt(e.target.value)
                    }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Porcentagem padrão sobre serviços realizados
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productCommission">Comissão em Produtos (%)</Label>
                  <Input
                    id="productCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={commissionRules.defaultProductCommission}
                    onChange={(e) => setCommissionRules(prev => ({
                      ...prev,
                      defaultProductCommission: parseInt(e.target.value)
                    }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Porcentagem padrão sobre produtos vendidos
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vipBonus">Bônus Cliente VIP (%)</Label>
                  <Input
                    id="vipBonus"
                    type="number"
                    min="0"
                    max="50"
                    value={commissionRules.vipClientBonus}
                    onChange={(e) => setCommissionRules(prev => ({
                      ...prev,
                      vipClientBonus: parseInt(e.target.value)
                    }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Bônus adicional para atendimento de clientes VIP
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newClientBonus">Bônus Novo Cliente (%)</Label>
                  <Input
                    id="newClientBonus"
                    type="number"
                    min="0"
                    max="50"
                    value={commissionRules.newClientBonus}
                    onChange={(e) => setCommissionRules(prev => ({
                      ...prev,
                      newClientBonus: parseInt(e.target.value)
                    }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Bônus para captação de novos clientes
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Exemplo de Cálculo:</h4>
                <p className="text-sm text-muted-foreground">
                  Serviço de R$ 40 = R$ {(40 * commissionRules.defaultServiceCommission / 100).toFixed(2)} de comissão<br/>
                  Produto de R$ 35 = R$ {(35 * commissionRules.defaultProductCommission / 100).toFixed(2)} de comissão
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
              <CardDescription>
                Configure como e quando as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Lembretes por E-mail</div>
                    <div className="text-sm text-muted-foreground">
                      Enviar lembretes de agendamento por e-mail
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Lembretes por SMS</div>
                    <div className="text-sm text-muted-foreground">
                      Enviar lembretes de agendamento por SMS/WhatsApp
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, smsReminders: checked }))
                    }
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
                    checked={notifications.birthdayMessages}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, birthdayMessages: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Mensagens Promocionais</div>
                    <div className="text-sm text-muted-foreground">
                      Enviar promoções e ofertas especiais
                    </div>
                  </div>
                  <Switch
                    checked={notifications.promotionalMessages}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, promotionalMessages: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
