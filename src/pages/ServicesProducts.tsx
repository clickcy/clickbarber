
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Scissors, Package, Clock, DollarSign } from "lucide-react";

const ServicesProducts = () => {
  // Dados mockados para demonstração
  const mockServices = [
    {
      id: 1,
      name: "Corte Masculino",
      description: "Corte de cabelo masculino tradicional",
      price: 25,
      duration: 30,
      category: "Corte",
      status: "Ativo"
    },
    {
      id: 2,
      name: "Barba Completa", 
      description: "Aparar e modelar barba completa",
      price: 20,
      duration: 20,
      category: "Barba",
      status: "Ativo"
    },
    {
      id: 3,
      name: "Corte + Barba",
      description: "Combo corte de cabelo e barba",
      price: 40,
      duration: 50,
      category: "Combo",
      status: "Ativo"
    },
    {
      id: 4,
      name: "Corte Infantil",
      description: "Corte especial para crianças",
      price: 20,
      duration: 25,
      category: "Corte",
      status: "Ativo"
    }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Pomada Modeladora",
      description: "Pomada para modelar cabelo",
      price: 35,
      cost: 20,
      stock: 15,
      category: "Cabelo",
      status: "Ativo"
    },
    {
      id: 2,
      name: "Óleo para Barba",
      description: "Óleo hidratante para barba",
      price: 28,
      cost: 15,
      stock: 8,
      category: "Barba", 
      status: "Ativo"
    },
    {
      id: 3,
      name: "Shampoo Premium",
      description: "Shampoo profissional para cabelo",
      price: 45,
      cost: 25,
      stock: 22,
      category: "Cabelo",
      status: "Ativo"
    },
    {
      id: 4,
      name: "Cera Modeladora",
      description: "Cera para finalização do cabelo",
      price: 32,
      cost: 18,
      stock: 5,
      category: "Cabelo",
      status: "Ativo"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Serviços & Produtos</h1>
          <p className="text-muted-foreground">Gerencie serviços oferecidos e produtos vendidos</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockServices.length}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockProducts.length}</div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockProducts.reduce((acc, p) => acc + p.stock, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {(mockServices.reduce((acc, s) => acc + s.price, 0) / mockServices.length).toFixed(0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Services and Products */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Serviços Oferecidos</h2>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServices.map((service) => (
              <Card key={service.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Scissors className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={service.status === "Ativo" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-lg font-bold text-primary">R$ {service.price}</div>
                        <div className="text-xs text-muted-foreground">Preço</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-lg font-bold text-primary">{service.duration}</div>
                        <div className="text-xs text-muted-foreground">Min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Produtos para Venda</h2>
            <Button className="gradient-bg hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Card key={product.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge 
                      variant={product.stock > 10 ? "default" : product.stock > 5 ? "secondary" : "destructive"}
                    >
                      {product.stock} un
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-bold text-primary">R$ {product.price}</div>
                      <div className="text-xs text-muted-foreground">Preço Venda</div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold text-muted-foreground">R$ {product.cost}</div>
                      <div className="text-xs text-muted-foreground">Custo</div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Margem:</span>
                      <span className="text-sm font-bold text-primary">
                        {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Estoque
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesProducts;
