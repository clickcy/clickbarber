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
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl font-bold">Nova Comanda</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 h-[calc(95vh-120px)]">
            {/* Coluna 1: Cliente e Itens */}
            <div className="space-y-3">
              {/* Cliente/Profissional Selection - Compacto */}
              <div className="border rounded-lg p-3">
                <div className="flex gap-2 mb-2">
                  <Button 
                    size="sm"
                    variant={clientType === 'client' ? 'default' : 'outline'}
                    onClick={() => setClientType('client')}
                  >
                    Cliente
                  </Button>
                  <Button 
                    size="sm"
                    variant={clientType === 'professional' ? 'default' : 'outline'}
                    onClick={() => setClientType('professional')}
                  >
                    Profissional
                  </Button>
                </div>

                {clientType === 'client' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="walkIn" 
                        checked={walkInClient}
                        onChange={(e) => setWalkInClient(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="walkIn" className="text-sm">Sem cadastro</Label>
                    </div>
                    
                    {!walkInClient && (
                      <>
                        <Input
                          placeholder="Buscar cliente"
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                          className="text-sm"
                        />
                        
                        {clientSearch && (
                          <div className="border rounded-md max-h-24 overflow-y-auto">
                            {filteredClients.map(client => (
                              <div 
                                key={client.id}
                                className={`p-2 cursor-pointer hover:bg-muted text-sm ${selectedClient === client.id.toString() ? 'bg-primary/10' : ''}`}
                                onClick={() => {
                                  setSelectedClient(client.id.toString());
                                  setClientSearch(client.name);
                                }}
                              >
                                <div className="font-medium">{client.name}</div>
                                <div className="text-xs text-muted-foreground">{client.phone}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                    <SelectTrigger className="text-sm">
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
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => setProductModalOpen(true)}
                  className="flex-1 text-sm"
                  variant="outline"
                  size="sm"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Produto
                </Button>
                <Button 
                  onClick={() => setServiceModalOpen(true)}
                  className="flex-1 text-sm"
                  variant="outline"
                  size="sm"
                >
                  <Scissors className="h-3 w-3 mr-1" />
                  Serviço
                </Button>
              </div>

              {/* Lista de Itens - Scrollável */}
              <div className="border rounded-lg p-3 flex-1 overflow-hidden">
                <h4 className="font-medium text-sm mb-2">Itens da Comanda</h4>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex items-start justify-between p-2 border rounded text-xs">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <Badge variant={item.type === 'product' ? 'default' : 'secondary'} className="text-xs px-1 py-0">
                            {item.type === 'product' ? 'P' : 'S'}
                          </Badge>
                          <span className="font-medium truncate">{item.name}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {item.quantity}x R$ {item.price.toFixed(2)} = R$ {(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.professional && (
                          <div className="text-muted-foreground">{item.professional.name}</div>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-6 w-6 p-0 ml-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {orderItems.length === 0 && (
                    <p className="text-muted-foreground text-center py-4 text-sm">
                      Nenhum item adicionado
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna 2: Desconto, Gorjeta e Pagamento */}
            <div className="space-y-3">
              {/* Desconto */}
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <Percent className="h-3 w-3" />
                  Desconto
                </h4>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="%"
                    value={discountPercent || ""}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    min="0"
                    max="100"
                    className="text-sm"
                  />
                  <Button onClick={applyDiscount} size="sm">Aplicar</Button>
                </div>
                {discountAmount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Desconto: R$ {discountAmount.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Gorjeta */}
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Gorjeta
                </h4>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Valor da gorjeta"
                    value={tipAmount || ""}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Método de Pagamento */}
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">Pagamento</h4>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Método de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Crédito</SelectItem>
                    <SelectItem value="debit">Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>

                {paymentMethod === 'cash' && (
                  <div className="space-y-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Valor recebido"
                      value={receivedAmount || ""}
                      onChange={(e) => setReceivedAmount(Number(e.target.value))}
                      min="0"
                      step="0.01"
                      className="text-sm"
                    />
                    {receivedAmount > 0 && (
                      <div className="flex justify-between text-sm font-medium">
                        <span>Troco:</span>
                        <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          R$ {change.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Coluna 3: Totais e Finalizar */}
            <div className="space-y-3">
              {/* Resumo dos Totais */}
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-3">Resumo</h4>
                <div className="space-y-2 text-sm">
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
              </div>

              {/* Resumo do Cliente/Profissional */}
              <div className="border rounded-lg p-3">
                <h4 className="font-medium text-sm mb-2">Cliente/Profissional</h4>
                <div className="text-sm text-muted-foreground">
                  {clientType === 'client' ? (
                    walkInClient ? (
                      "Cliente sem cadastro"
                    ) : selectedClient ? (
                      mockClients.find(c => c.id.toString() === selectedClient)?.name || "Cliente selecionado"
                    ) : (
                      "Nenhum cliente selecionado"
                    )
                  ) : (
                    selectedProfessional ? (
                      mockProfessionals.find(p => p.id.toString() === selectedProfessional)?.name || "Profissional selecionado"
                    ) : (
                      "Nenhum profissional selecionado"
                    )
                  )}
                </div>
              </div>

              {/* Resumo dos Itens */}
              <div className="border rounded-lg p-3 flex-1">
                <h4 className="font-medium text-sm mb-2">Resumo dos Itens</h4>
                <div className="text-xs text-muted-foreground">
                  <div>Total de itens: {orderItems.length}</div>
                  <div>Produtos: {orderItems.filter(i => i.type === 'product').length}</div>
                  <div>Serviços: {orderItems.filter(i => i.type === 'service').length}</div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                  Salvar Comanda
                </Button>
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Finalizar Comanda
                </Button>
              </div>
            </div>
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