import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, X, ShoppingCart, Scissors, Percent, DollarSign } from "lucide-react";
import { ProductModal } from "./ProductModal";
import { ServiceModal } from "./ServiceModal";

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

interface OrderItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  price: number;
  quantity: number;
  professional?: Professional;
  commission?: number;
  datetime?: Date;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data
const mockProfessionals: Professional[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Pedro Costa" }
];

const mockClients: Client[] = [
  { id: 1, name: "Carlos Alberto", phone: "(11) 99999-1111", email: "carlos@email.com" },
  { id: 2, name: "Roberto Silva", phone: "(11) 99999-2222", email: "roberto@email.com" },
  { id: 3, name: "José Santos", phone: "(11) 99999-3333", email: "jose@email.com" }
];

const OrderModal = ({ isOpen, onClose }: OrderModalProps) => {
  const [clientType, setClientType] = useState<'client' | 'professional'>('client');
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [clientSearch, setClientSearch] = useState("");
  const [walkInClient, setWalkInClient] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [tipProfessional, setTipProfessional] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  
  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Calculations
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalAfterDiscount = subtotal - discountAmount;
  const totalWithTip = totalAfterDiscount + tipAmount;
  const change = receivedAmount - totalWithTip;

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    client.phone.includes(clientSearch)
  );

  const handleAddItem = (item: Omit<OrderItem, 'id'>) => {
    const newItem: OrderItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString()
    };
    setOrderItems([...orderItems, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const applyDiscount = () => {
    // Logic for applying discount
    console.log("Applying discount:", discountPercent);
  };

  const handleSubmit = () => {
    // Validation
    if (clientType === 'client' && !selectedClient && !walkInClient) {
      alert("Por favor, selecione um cliente ou marque como cliente sem cadastro");
      return;
    }
    
    if (clientType === 'professional' && !selectedProfessional) {
      alert("Por favor, selecione um profissional");
      return;
    }

    if (orderItems.length === 0) {
      alert("Adicione pelo menos um item à comanda");
      return;
    }

    if (!paymentMethod) {
      alert("Selecione um método de pagamento");
      return;
    }

    // Here would be the API call to save the order
    console.log("Order data:", {
      clientType,
      selectedClient,
      selectedProfessional,
      walkInClient,
      orderItems,
      discountPercent,
      tipAmount,
      tipProfessional,
      paymentMethod,
      receivedAmount,
      totals: {
        subtotal,
        discountAmount,
        totalAfterDiscount,
        totalWithTip,
        change
      }
    });

    onClose();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setClientType('client');
      setSelectedClient("");
      setSelectedProfessional("");
      setClientSearch("");
      setWalkInClient(false);
      setOrderItems([]);
      setDiscountPercent(0);
      setTipAmount(0);
      setTipProfessional("");
      setPaymentMethod("");
      setReceivedAmount(0);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Nova Comanda</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Cliente/Profissional Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cliente/Profissional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    variant={clientType === 'client' ? 'default' : 'outline'}
                    onClick={() => setClientType('client')}
                  >
                    Cliente
                  </Button>
                  <Button 
                    variant={clientType === 'professional' ? 'default' : 'outline'}
                    onClick={() => setClientType('professional')}
                  >
                    Profissional
                  </Button>
                </div>

                {clientType === 'client' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="walkIn" 
                        checked={walkInClient}
                        onChange={(e) => setWalkInClient(e.target.checked)}
                      />
                      <Label htmlFor="walkIn">Cliente sem cadastro</Label>
                    </div>
                    
                    {!walkInClient && (
                      <>
                        <Input
                          placeholder="Buscar cliente por nome ou telefone"
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                        />
                        
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
                      </>
                    )}
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Itens da Comanda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Button 
                    onClick={() => setProductModalOpen(true)}
                    className="flex items-center gap-2"
                    variant="outline"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Produto
                  </Button>
                  <Button 
                    onClick={() => setServiceModalOpen(true)}
                    className="flex items-center gap-2"
                    variant="outline"
                  >
                    <Scissors className="h-4 w-4" />
                    Serviço
                  </Button>
                </div>

                {/* Order Items List */}
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={item.type === 'product' ? 'default' : 'secondary'}>
                            {item.type === 'product' ? 'Produto' : 'Serviço'}
                          </Badge>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Qtd: {item.quantity} x R$ {item.price.toFixed(2)} = R$ {(item.price * item.quantity).toFixed(2)}
                          {item.professional && ` | ${item.professional.name}`}
                          {item.commission && ` | Comissão: ${item.commission}%`}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {orderItems.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum item adicionado à comanda
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Discount and Tip */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Desconto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Porcentagem"
                      value={discountPercent || ""}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      min="0"
                      max="100"
                    />
                    <Button onClick={applyDiscount}>Aplicar</Button>
                  </div>
                  {discountAmount > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Desconto: R$ {discountAmount.toFixed(2)}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Gorjeta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Valor da gorjeta"
                    value={tipAmount || ""}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                  <Select value={tipProfessional} onValueChange={setTipProfessional}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProfessionals.map(prof => (
                        <SelectItem key={prof.id} value={prof.id.toString()}>
                          {prof.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Payment and Total */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Método de Pagamento</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o método de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Crédito</SelectItem>
                      <SelectItem value="debit">Débito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto ({discountPercent}%):</span>
                      <span>- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {tipAmount > 0 && (
                    <div className="flex justify-between">
                      <span>Gorjeta:</span>
                      <span>+ R$ {tipAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {totalWithTip.toFixed(2)}</span>
                  </div>
                </div>

                {paymentMethod === 'cash' && (
                  <div className="space-y-2">
                    <Label>Valor Recebido</Label>
                    <Input
                      type="number"
                      placeholder="Valor recebido"
                      value={receivedAmount || ""}
                      onChange={(e) => setReceivedAmount(Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                    {receivedAmount > 0 && (
                      <div className="flex justify-between font-medium">
                        <span>Troco:</span>
                        <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          R$ {change.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Finalizar Comanda
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Modal */}
      <ProductModal 
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        onAddItem={handleAddItem}
      />

      {/* Service Modal */}
      <ServiceModal 
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </>
  );
};

export default OrderModal;