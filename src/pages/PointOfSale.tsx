
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, ShoppingCart, User, Receipt, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PointOfSale = () => {
  const [currentOrder, setCurrentOrder] = useState({
    client: null,
    professional: null,
    items: [],
    total: 0
  });

  const [searchClient, setSearchClient] = useState("");

  // Dados mockados
  const mockClients = [
    { id: 1, name: "Carlos Alberto Silva", phone: "(11) 99999-1234" },
    { id: 2, name: "Roberto Santos", phone: "(11) 88888-5678" },
    { id: 3, name: "José Lima", phone: "(11) 77777-9012" }
  ];

  const mockProfessionals = [
    { id: 1, name: "João Silva" },
    { id: 2, name: "Maria Santos" },
    { id: 3, name: "Pedro Costa" }
  ];

  const mockServices = [
    { id: 1, name: "Corte Masculino", price: 25, duration: 30, type: "service" },
    { id: 2, name: "Barba Completa", price: 20, duration: 20, type: "service" },
    { id: 3, name: "Corte + Barba", price: 40, duration: 50, type: "service" },
    { id: 4, name: "Corte Infantil", price: 20, duration: 25, type: "service" }
  ];

  const mockProducts = [
    { id: 5, name: "Pomada Modeladora", price: 35, stock: 15, type: "product" },
    { id: 6, name: "Óleo para Barba", price: 28, stock: 8, type: "product" },
    { id: 7, name: "Shampoo Premium", price: 45, stock: 22, type: "product" },
    { id: 8, name: "Cera Modeladora", price: 32, stock: 5, type: "product" }
  ];

  const allItems = [...mockServices, ...mockProducts];

  const addItemToOrder = (item) => {
    const existingItem = currentOrder.items.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        ),
        total: prev.total + item.price
      }));
    } else {
      setCurrentOrder(prev => ({
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
        total: prev.total + item.price
      }));
    }
    
    toast({
      title: "Item adicionado",
      description: `${item.name} foi adicionado à comanda`
    });
  };

  const removeItemFromOrder = (itemId) => {
    const item = currentOrder.items.find(orderItem => orderItem.id === itemId);
    if (item) {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.filter(orderItem => orderItem.id !== itemId),
        total: prev.total - (item.price * item.quantity)
      }));
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromOrder(itemId);
      return;
    }

    const item = currentOrder.items.find(orderItem => orderItem.id === itemId);
    if (item) {
      const priceDifference = (newQuantity - item.quantity) * item.price;
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.map(orderItem =>
          orderItem.id === itemId
            ? { ...orderItem, quantity: newQuantity }
            : orderItem
        ),
        total: prev.total + priceDifference
      }));
    }
  };

  const finishOrder = () => {
    if (!currentOrder.client) {
      toast({
        title: "Erro",
        description: "Selecione um cliente para finalizar a comanda",
        variant: "destructive"
      });
      return;
    }

    if (currentOrder.items.length === 0) {
      toast({
        title: "Erro", 
        description: "Adicione itens à comanda antes de finalizar",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Comanda finalizada!",
      description: `Total: R$ ${currentOrder.total.toFixed(2)}`
    });

    // Reset order
    setCurrentOrder({
      client: null,
      professional: null,
      items: [],
      total: 0
    });
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.phone.includes(searchClient)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ponto de Venda (PDV)</h1>
          <p className="text-muted-foreground">Sistema de comandas e controle de consumo</p>
        </div>
        <Button 
          onClick={() => setCurrentOrder({ client: null, professional: null, items: [], total: 0 })}
          variant="outline"
        >
          Nova Comanda
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Selection and Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Selecionar Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Buscar cliente por nome ou telefone..."
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {filteredClients.map(client => (
                  <Button
                    key={client.id}
                    variant={currentOrder.client?.id === client.id ? "default" : "outline"}
                    className="justify-start h-auto p-3"
                    onClick={() => setCurrentOrder(prev => ({ ...prev, client }))}
                  >
                    <div className="text-left">
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
                    </div>
                  </Button>
                ))}
              </div>

              {currentOrder.client && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">Cliente selecionado:</span>
                    <span className="text-primary font-medium">{currentOrder.client.name}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Profissional Responsável</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={currentOrder.professional?.id?.toString()} 
                onValueChange={(value) => {
                  const professional = mockProfessionals.find(p => p.id.toString() === value);
                  setCurrentOrder(prev => ({ ...prev, professional }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {mockProfessionals.map(professional => (
                    <SelectItem key={professional.id} value={professional.id.toString()}>
                      {professional.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Services and Products */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Itens</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="services">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="products">Produtos</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockServices.map(service => (
                      <Button
                        key={service.id}
                        variant="outline"
                        className="h-auto p-4 justify-between"
                        onClick={() => addItemToOrder(service)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.duration} min</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">R$ {service.price}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockProducts.map(product => (
                      <Button
                        key={product.id}
                        variant="outline" 
                        className="h-auto p-4 justify-between"
                        onClick={() => addItemToOrder(product)}
                        disabled={product.stock === 0}
                      >
                        <div className="text-left">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Estoque: {product.stock}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">R$ {product.price}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Current Order */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Comanda Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentOrder.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum item adicionado</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {currentOrder.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            R$ {item.price} {item.type === "service" && `• ${item.duration} min`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeItemFromOrder(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">R$ {currentOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-bg hover:opacity-90"
                    onClick={finishOrder}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Finalizar Comanda
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
