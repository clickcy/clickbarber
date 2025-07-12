
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Scissors, 
  Clock, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  MapPin,
  Star,
  Check
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingPublic = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Dados mockados
  const establishmentInfo = {
    name: "ClickBarber - Barbearia Premium",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    phone: "(11) 99999-0000",
    rating: 4.8,
    totalReviews: 156
  };

  const services = [
    { id: 1, name: "Corte Masculino", price: 25, duration: 30, description: "Corte tradicional ou moderno" },
    { id: 2, name: "Barba Completa", price: 20, duration: 20, description: "Aparar e modelar barba" },
    { id: 3, name: "Corte + Barba", price: 40, duration: 50, description: "Combo completo com desconto" },
    { id: 4, name: "Corte Infantil", price: 20, duration: 25, description: "Corte especial para crianças" }
  ];

  const professionals = [
    { id: 1, name: "João Silva", avatar: "JS", rating: 4.9, specialties: ["Corte Masculino", "Barba"] },
    { id: 2, name: "Maria Santos", avatar: "MS", rating: 4.8, specialties: ["Corte Feminino", "Coloração"] },
    { id: 3, name: "Pedro Costa", avatar: "PC", rating: 4.7, specialties: ["Corte Infantil", "Penteados"] },
    { id: 0, name: "Qualquer Profissional", avatar: "?", rating: 4.8, specialties: ["Todos os serviços"] }
  ];

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const handleBooking = () => {
    if (!selectedService || !selectedTime || !clientData.name || !clientData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios para continuar",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Agendamento realizado!",
      description: "Você receberá uma confirmação no WhatsApp em breve.",
    });

    // Reset form
    setSelectedService(null);
    setSelectedProfessional(null);
    setSelectedDate("");
    setSelectedTime("");
    setClientData({ name: "", phone: "", email: "" });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Scissors className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">{establishmentInfo.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{establishmentInfo.rating}</span>
                    <span className="text-muted-foreground">({establishmentInfo.totalReviews} avaliações)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {establishmentInfo.address}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {establishmentInfo.phone}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Escolha o Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map(service => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedService?.id === service.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{service.name}</h3>
                        {selectedService?.id === service.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {service.duration} min
                        </div>
                        <div className="flex items-center gap-1 font-bold text-primary">
                          <DollarSign className="h-4 w-4" />
                          R$ {service.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select Professional */}
            {selectedService && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    Escolha o Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {professionals.map(professional => (
                      <div
                        key={professional.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedProfessional?.id === professional.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedProfessional(professional)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {professional.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{professional.name}</h3>
                              {selectedProfessional?.id === professional.id && (
                                <Check className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{professional.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {professional.specialties.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Select Date and Time */}
            {selectedService && selectedProfessional && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    Escolha Data e Horário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        min={minDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="space-y-2">
                      <Label>Horários Disponíveis</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {availableTimes.map(time => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="h-10"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Client Information */}
            {selectedService && selectedProfessional && selectedTime && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    Seus Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={clientData.name}
                        onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={clientData.phone}
                        onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail (opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Agendamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService ? (
                  <>
                    <div>
                      <div className="font-medium">{selectedService.name}</div>
                      <div className="text-sm text-muted-foreground">{selectedService.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          {selectedService.duration} min
                        </div>
                        <div className="font-bold text-primary">R$ {selectedService.price}</div>
                      </div>
                    </div>

                    {selectedProfessional && (
                      <>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Profissional:</div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {selectedProfessional.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{selectedProfessional.name}</div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{selectedProfessional.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedDate && selectedTime && (
                      <>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Data e Horário:</div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <div>
                              <div className="font-medium">
                                {new Date(selectedDate).toLocaleDateString('pt-BR', {
                                  weekday: 'long',
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="text-sm text-muted-foreground">às {selectedTime}</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />
                    <div className="flex items-center justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">R$ {selectedService.price}</span>
                    </div>

                    <Button 
                      className="w-full gradient-bg hover:opacity-90"
                      size="lg"
                      onClick={handleBooking}
                      disabled={!selectedService || !selectedTime || !clientData.name || !clientData.phone}
                    >
                      Confirmar Agendamento
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Você receberá uma confirmação via WhatsApp após o agendamento
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Selecione um serviço para continuar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPublic;
