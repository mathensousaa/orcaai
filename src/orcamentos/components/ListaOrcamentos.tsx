import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Download, Eye, Calendar, DollarSign, Package, Filter, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { useQuotesWithRelations, useDeleteQuoteMutation } from "../services";

// Temporary type until Supabase types are properly generated
type QuoteWithRelations = {
  id: string;
  quote_number: string;
  quote_name: string;
  final_price: number;
  subtotal: number;
  total: number;
  profit_margin_percent: number;
  created_at: string;
  clients?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  } | null;
  companies?: {
    id: string;
    name: string;
    email?: string;
    logo_url?: string;
  } | null;
};

export function ListaOrcamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: quotes = [], isLoading, error } = useQuotesWithRelations() as { 
    data: QuoteWithRelations[], 
    isLoading: boolean, 
    error: any 
  };
  const deleteQuote = useDeleteQuoteMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredQuotes = quotes.filter(quote => {
    const clientName = quote.clients?.name || "";
    const quoteName = quote.quote_name || "";
    
    return clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           quoteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteQuote = async (id: string) => {
    try {
      await deleteQuote.mutateAsync(id);
      toast({
        title: "Orçamento excluído",
        description: "O orçamento foi excluído com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o orçamento.",
        variant: "destructive",
      });
    }
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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center animate-pulse">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Carregando orçamentos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-destructive-light rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Erro ao carregar orçamentos</h2>
        <p className="text-muted-foreground">
          Ocorreu um erro ao carregar os orçamentos. Tente novamente.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (quotes.length === 0) {
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
            Busca
          </CardTitle>
          <CardDescription>
            Encontre orçamentos por cliente, nome ou número
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, nome ou número do orçamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
                <p className="text-2xl font-bold text-foreground">{quotes.length}</p>
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
                  {formatCurrency(quotes.reduce((sum, q) => sum + q.final_price, 0))}
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
                  {quotes.filter(q => 
                    new Date(q.created_at).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de orçamentos */}
      <div className="space-y-4">
        {filteredQuotes.length === 0 ? (
          <Card className="shadow-subtle">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum orçamento encontrado com os filtros aplicados.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredQuotes.map((quote) => (
            <Card key={quote.id} className="shadow-subtle hover:shadow-elegant transition-all duration-200 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {quote.clients?.name || "Cliente não informado"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Package className="w-4 h-4" />
                          {quote.quote_name}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          #{quote.quote_number}
                        </p>
                      </div>
                      <Badge variant="secondary">{quote.profit_margin_percent}% margem</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Valor Final</p>
                        <p className="font-semibold text-success">{formatCurrency(quote.final_price)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-medium">{formatCurrency(quote.subtotal)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium">{formatCurrency(quote.total)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Data</p>
                        <p className="font-medium">{formatDate(quote.created_at)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/orcamento/${quote.id}`)}
                      size="sm"
                      className="bg-gradient-primary hover:bg-primary-hover"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button
                      onClick={() => handleDeleteQuote(quote.id)}
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      disabled={deleteQuote.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
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