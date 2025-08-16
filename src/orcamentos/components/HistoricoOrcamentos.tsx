import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Download, Eye, Calendar, DollarSign, Package, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOrcamento } from "../contexts/OrcamentoContext";
import type { Orcamento } from "../types";

export function HistoricoOrcamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { orcamentos, setOrcamentoAtual } = useOrcamento();
  const navigate = useNavigate();

  const filteredOrcamentos = orcamentos.filter(orcamento => {
    const matchesSearch = 
      orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orcamento.produto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || orcamento.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrcamento = (orcamento: Orcamento) => {
    setOrcamentoAtual(orcamento);
    navigate("/orcamento");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'approved':
        return <Badge className="bg-success-light text-success">Aprovado</Badge>;
      case 'sent':
        return <Badge className="bg-primary-light text-primary">Enviado</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  if (orcamentos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Nenhum orçamento encontrado</h2>
        <p className="text-muted-foreground">
          Você ainda não criou nenhum orçamento. Comece criando seu primeiro!
        </p>
        <Button onClick={() => navigate("/")} className="bg-gradient-primary">
          Criar Primeiro Orçamento
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Histórico de Orçamentos</h1>
        <p className="text-muted-foreground">
          Gerencie e visualize todos os seus orçamentos criados
        </p>
      </div>

      {/* Filtros e busca */}
      <Card className="shadow-elegant bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtros
          </CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar orçamentos específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente ou produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="sent">Enviado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Orçamentos</p>
                <p className="text-2xl font-bold text-foreground">{orcamentos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(orcamentos.reduce((sum, o) => sum + o.valorFinal, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold text-foreground">
                  {orcamentos.filter(o => 
                    new Date(o.dataCreated).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de orçamentos */}
      <div className="space-y-4">
        {filteredOrcamentos.length === 0 ? (
          <Card className="shadow-subtle">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum orçamento encontrado com os filtros aplicados.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrcamentos.map((orcamento) => (
            <Card key={orcamento.id} className="shadow-subtle hover:shadow-elegant transition-all duration-200 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {orcamento.cliente}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="w-4 h-4" />
                          {orcamento.produto}
                        </div>
                      </div>
                      {getStatusBadge(orcamento.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Valor</p>
                        <p className="font-semibold text-success">{formatCurrency(orcamento.valorFinal)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quantidade</p>
                        <p className="font-medium">{orcamento.quantidade}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prazo</p>
                        <p className="font-medium">{orcamento.prazo}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Data</p>
                        <p className="font-medium">{formatDate(orcamento.dataCreated)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewOrcamento(orcamento)}
                      size="sm"
                      className="bg-gradient-primary hover:bg-primary-hover"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button
                      onClick={() => {/* TODO: Implementar exportação */}}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Botão para novo orçamento */}
      <div className="text-center pt-6">
        <Button 
          onClick={() => navigate("/")}
          className="bg-gradient-primary hover:bg-primary-hover shadow-elegant"
          size="lg"
        >
          <FileText className="w-5 h-5 mr-2" />
          Criar Novo Orçamento
        </Button>
      </div>
    </div>
  );
}