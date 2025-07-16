import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Professional {
  id: number;
  name: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: {
    type: 'product';
    name: string;
    price: number;
    quantity: number;
    professional?: Professional;
    commission?: number;
  }) => void;
}

// Mock data
const mockProducts: Product[] = [
  { id: 1, name: "Shampoo Premium", price: 45.00, stock: 20 },
  { id: 2, name: "Condicionador", price: 38.00, stock: 15 },
  { id: 3, name: "Pomada Modeladora", price: 25.00, stock: 30 },
  { id: 4, name: "Óleo para Barba", price: 35.00, stock: 12 }
];

const mockProfessionals: Professional[] = [
  { id: 1, name: "João Silva" },
  { id: 2, name: "Maria Santos" },
  { id: 3, name: "Pedro Costa" }
];

export const ProductModal = ({ isOpen, onClose, onAddItem }: ProductModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [commission, setCommission] = useState<number>(0);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");

  const selectedProductData = mockProducts.find(p => p.id.toString() === selectedProduct);

  const handleAdd = () => {
    if (!selectedProduct) {
      alert("Selecione um produto");
      return;
    }

    if (quantity <= 0) {
      alert("Quantidade deve ser maior que zero");
      return;
    }

    const product = mockProducts.find(p => p.id.toString() === selectedProduct);
    const professional = mockProfessionals.find(p => p.id.toString() === selectedProfessional);

    if (!product) return;

    onAddItem({
      type: 'product',
      name: product.name,
      price: product.price,
      quantity,
      professional,
      commission: commission > 0 ? commission : undefined
    });

    // Reset form
    setSelectedProduct("");
    setQuantity(1);
    setCommission(0);
    setSelectedProfessional("");
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map(product => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} - R$ {product.price.toFixed(2)} (Est: {product.stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={selectedProductData?.stock || 999}
            />
          </div>

          <div className="space-y-2">
            <Label>Comissão (%)</Label>
            <Input
              type="number"
              value={commission || ""}
              onChange={(e) => setCommission(Number(e.target.value))}
              min="0"
              max="100"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label>Profissional</Label>
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
          </div>

          {selectedProductData && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm">
                <div className="font-medium">Preço unitário: R$ {selectedProductData.price.toFixed(2)}</div>
                <div className="font-bold">Total: R$ {(selectedProductData.price * quantity).toFixed(2)}</div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleAdd} className="flex-1">
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};