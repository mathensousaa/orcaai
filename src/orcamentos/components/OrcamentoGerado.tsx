import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	FileText,
	Download,
	MessageCircle,
	RotateCcw,
	History,
	Calendar,
	DollarSign,
	Package,
	User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useQuote } from "@/orcamentos/services";

export function OrcamentoGerado() {
	const [isExporting, setIsExporting] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const { toast } = useToast();
	const { data: quote } = useQuote(id);

	if (!quote) {
		return (
			<div className="max-w-4xl mx-auto text-center space-y-4">
				<div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
					<FileText className="w-8 h-8 text-muted-foreground" />
				</div>
				<h2 className="text-2xl font-semibold text-foreground">
					Nenhum orçamento encontrado
				</h2>
				<p className="text-muted-foreground">
					Crie um novo orçamento para visualizá-lo aqui.
				</p>
				<Button onClick={() => navigate("/")} className="bg-gradient-primary">
					Criar Novo Orçamento
				</Button>
			</div>
		);
	}

	const handleExportPDF = async () => {
		setIsExporting(true);
		try {
			// Simula exportação
			await new Promise((resolve) => setTimeout(resolve, 2000));
			toast({
				title: "PDF exportado com sucesso!",
				description: "O arquivo foi baixado para seu dispositivo.",
			});
		} catch (error) {
			toast({
				title: "Erro ao exportar PDF",
				description: "Tente novamente em alguns instantes.",
				variant: "destructive",
			});
		} finally {
			setIsExporting(false);
		}
	};

	const handleWhatsApp = () => {
		const message = `Olá! Segue o orçamento:\n\nCliente: ${quote?.client?.name ?? "N/I"}\nValor: ${formatCurrency(Number(quote?.final_price ?? 0))}\nValidade: ${quote?.valid_until ? new Date(quote.valid_until).toLocaleDateString("pt-BR") : "N/I"}\n\nAguardo retorno!`;
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold text-foreground">Orçamento Gerado</h1>
				<p className="text-muted-foreground">
					Visualize, exporte ou compartilhe seu orçamento
				</p>
			</div>

			{/* Card principal do orçamento */}
			<Card className="shadow-premium bg-gradient-card border-0">
				<CardHeader className="pb-6">
					<div className="flex items-start justify-between">
						<div>
							<CardTitle className="text-2xl text-foreground mb-2">
								Orçamento #{quote.quote_number}
							</CardTitle>
							<CardDescription className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								Criado em {formatDate(quote.created_at)}
							</CardDescription>
						</div>
						{/* <Badge
							variant="secondary"
							className="bg-success-light text-success"
						>
							{quote.status === "draft" ? "Rascunho" : "Aprovado"}
						</Badge> */}
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Informações do cliente */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
									<User className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Cliente</p>
									<p className="font-semibold text-foreground">
										{quote.client?.name ?? "Cliente não informado"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
									<Package className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Produto/Serviço
									</p>
									<p className="font-semibold text-foreground">
										{quote.quote_name}
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
									<DollarSign className="w-5 h-5 text-success" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Valor Total</p>
									<p className="text-2xl font-bold text-success">
										{formatCurrency(Number(quote.final_price))}
									</p>
								</div>
							</div>

							<div className="bg-muted/50 rounded-lg p-4">
								<div className="flex justify-between items-center text-sm">
									<span className="text-muted-foreground">Subtotal:</span>
									<span className="font-medium">
										{formatCurrency(Number(quote.subtotal))}
									</span>
								</div>
								<div className="flex justify-between items-center text-sm mt-1">
									<span className="text-muted-foreground">Validade:</span>
									<span className="font-medium">
										{quote.valid_until
											? new Date(quote.valid_until).toLocaleDateString("pt-BR")
											: "N/I"}
									</span>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Descrição e observações */}
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold text-foreground mb-2">
								Informações adicionais
							</h3>
							<p className="text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-4">
								{quote.additional_notes}
							</p>
						</div>
						<div>
							<h3 className="font-semibold text-foreground mb-2">
								Prazo de entrega
							</h3>
							<p className="text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-4">
								{quote.delivery_time}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Ações */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Button
					onClick={handleExportPDF}
					disabled={isExporting}
					className="bg-gradient-primary hover:bg-primary-hover shadow-elegant"
				>
					{isExporting ? (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							Exportando...
						</div>
					) : (
						<>
							<Download className="w-4 h-4 mr-2" />
							Exportar PDF
						</>
					)}
				</Button>

				<Button
					onClick={handleWhatsApp}
					variant="outline"
					className="border-success text-success hover:bg-success-light"
				>
					<MessageCircle className="w-4 h-4 mr-2" />
					WhatsApp
				</Button>

				<Button onClick={() => navigate("/")} variant="outline">
					<RotateCcw className="w-4 h-4 mr-2" />
					Novo Orçamento
				</Button>

				<Button onClick={() => navigate("/historico")} variant="outline">
					<History className="w-4 h-4 mr-2" />
					Ver Histórico
				</Button>
			</div>
		</div>
	);
}
