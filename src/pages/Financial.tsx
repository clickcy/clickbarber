
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  CreditCard,
  Plus,
  Calendar,
  Users
} from "lucide-react";

const Financial = () => {
  // Dados mockados para demonstração
  const monthlyStats = {
    revenue: 28500,
    expenses: 12300,
    profit: 16200,
    commissions: 8550,
    growth: 12.5
  };

  const revenueData = [
    { month: "Jan", revenue: 22000, expenses: 10000 },
    { month: "Fev", revenue: 25000, expenses: 11000 },
    { month: "Mar", revenue: 28500, expenses: 12300 },
    { month: "Abr", revenue: 26000, expenses: 11800 },
    { month: "Mai", revenue: 30000, expenses: 13000 },
    { month: "Jun", revenue: 32000, expenses: 14000 }
  ];

  const expenseCategories = [
    { name: "Aluguel", value: 4000, color: "#3b82f6" },
    { name: "Produtos", value: 2800, color: "#10b981" },
    { name: "Energia", value: 800, color: "#f59e0b" },
    { name: "Internet", value: 200, color: "#ef4444" },
    { name: "Outros", value: 4500, color: "#8b5cf6" }
  ];

  const mockExpenses = [
    { id: 1, description: "Aluguel - Março", amount: 4000, date: "2024-03-01", category: "Fixo" },
    { id: 2, description: "Conta de Luz", amount: 350, date: "2024-03-15", category: "Utilidades" },
    { id: 3, description: "Compra de Produtos", amount: 1200, date: "2024-03-10", category: "Estoque" },
    { id: 4, description: "Internet", amount: 200, date: "2024-03-05", category: "Fixo" }
  ];

  const mockCommissions = [
    { professional: "João Silva", services: 12, products: 8, total: 2800, percentage: 60 },
    { professional: "Maria Santos", services: 15, products: 12, total: 3200, percentage: 65 },
    { professional: "Pedro Costa", services: 8, products: 5, total: 1800, percentage: 55 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">Dashboard financeiro e controle de despesas</p>
        </div>
        <Button className="gradient-bg hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Despesa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {monthlyStats.revenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{monthlyStats.growth}%</span>
              <span className="text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {monthlyStats.expenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {((monthlyStats.expenses / monthlyStats.revenue) * 100).toFixed(1)}% do faturamento
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ {monthlyStats.profit.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {((monthlyStats.profit / monthlyStats.revenue) * 100).toFixed(1)}% margem
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {monthlyStats.commissions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {((monthlyStats.commissions / monthlyStats.revenue) * 100).toFixed(1)}% do faturamento
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+{monthlyStats.growth}%</div>
            <div className="text-sm text-muted-foreground">Média dos últimos 6 meses</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento vs Despesas</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="Faturamento" />
                <Bar dataKey="expenses" fill="#ef4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>Distribuição do mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="expenses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="commissions">Comissões</TabsTrigger>
          <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        {/* Expenses Tab */}
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Despesas</CardTitle>
              <CardDescription>Registre e gerencie todas as despesas do estabelecimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockExpenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-500">-R$ {expense.amount.toLocaleString()}</div>
                      <Badge variant="outline">{expense.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Commissions Tab */}
        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Comissões</CardTitle>
              <CardDescription>Comissões por profissional no mês atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCommissions.map((commission, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{commission.professional}</div>
                      <div className="text-right">
                        <div className="font-bold text-primary">R$ {commission.total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{commission.percentage}% de comissão</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Serviços:</span>
                        <span className="ml-2 font-medium">{commission.services} atendimentos</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Produtos:</span>
                        <span className="ml-2 font-medium">{commission.products} vendas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
              <CardDescription>Entrada e saída de dinheiro por período</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Entradas"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Saídas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
