import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator, ArrowRight, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import { useOrcamento } from "../contexts/OrcamentoContext";
import type { FormOrcamento } from "../types";
import { useEnviarOrcamentoMutation } from "../services/mutations";

const formSchema = z.object({
	cliente: z
		.string()
		.min(2, "Nome do cliente deve ter pelo menos 2 caracteres"),
	produto: z
		.string()
		.min(2, "Produto/Serviço deve ter pelo menos 2 caracteres"),
	quantidade: z.string().min(1, "Quantidade deve ser maior que zero"),
	// descricao: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
	// prazo: z.string().min(2, "Prazo é obrigatório"),
	margemLucro: z.number().min(0).max(100, "Margem deve estar entre 0 e 100%"),
	observacoes: z.string(),
});

export function FormularioOrcamento() {
	const navigate = useNavigate();

	const { toast } = useToast();
	const { mutate: sendQuote, isPending } = useEnviarOrcamentoMutation();

	const form = useForm<FormOrcamento>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cliente: "",
			produto: "",
			quantidade: "",
			// descricao: "",
			// prazo: "",
			margemLucro: 20,
			observacoes: "",
		},
	});

	const onSubmit = async (values: FormOrcamento) => {
		sendQuote(values, {
			onSuccess: (data) => {
				toast({
					title: "Orçamento gerado com sucesso!",
					description: "Redirecionando para visualização...",
				});

				navigate(`/orcamento/${data.id}`);
			},
			onError: () => {
				toast({
					title: "Erro ao gerar orçamento",
					description: "Tente novamente em alguns instantes.",
					variant: "destructive",
				});
			},
		});
	};

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold text-foreground">Novo Orçamento</h1>
				<p className="text-muted-foreground">
					Preencha os dados abaixo para gerar um orçamento profissional
				</p>
			</div>

			<Card className="shadow-elegant bg-gradient-card border-0">
				<CardHeader className="pb-6">
					<CardTitle className="flex items-center gap-2 text-xl">
						<Calculator className="w-5 h-5 text-primary" />
						Informações do Orçamento
					</CardTitle>
					<CardDescription>
						Todas as informações são importantes para gerar um orçamento preciso
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="cliente"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Cliente
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Nome do cliente"
												className="transition-all focus:ring-2 focus:ring-primary/20"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="produto"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium">
												Produto/Serviço
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Descrição do produto ou serviço"
													className="transition-all focus:ring-2 focus:ring-primary/20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="quantidade"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium">
												Quantidade/Escopo
											</FormLabel>
											<FormControl>
												<Input
													className="transition-all focus:ring-2 focus:ring-primary/20"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* <FormField
                  control={form.control}
                  name="prazo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Prazo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 15 dias, 1 semana, 30/12/2024" 
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
							</div>

							{/* <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Descrição Detalhada</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva detalhadamente o produto ou serviço..." 
                        className="min-h-[100px] transition-all focus:ring-2 focus:ring-primary/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

							<FormField
								control={form.control}
								name="margemLucro"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 text-sm font-medium">
											Margem de Lucro (%)
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="w-4 h-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent>
														<p>
															Defina sua margem de lucro (%) — esse valor será
															aplicado
															<br />
															sobre o preço base para calcular o valor final do
															orçamento.
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="0"
												max="100"
												className="transition-all focus:ring-2 focus:ring-primary/20"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
										</FormControl>
										<FormDescription>
											Defina sua margem de lucro (%) — esse valor será aplicado
											sobre o preço base para calcular o valor final do
											orçamento.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="observacoes"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-2 text-sm font-medium">
											Observações Adicionais
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<HelpCircle className="w-4 h-4 text-muted-foreground" />
													</TooltipTrigger>
													<TooltipContent>
														<p>
															Use este campo para informar detalhes importantes,
															<br />
															como o custo de materiais ou especificações do
															serviço.
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Informações adicionais, custos de materiais, especificações técnicas..."
												className="min-h-[80px] transition-all focus:ring-2 focus:ring-primary/20"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Use este campo para informar detalhes importantes, como o
											custo de materiais ou especificações do serviço. Quanto
											mais informações você fornecer, mais preciso será o
											orçamento.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="pt-4">
								<Button
									type="submit"
									className="w-full bg-gradient-primary hover:bg-primary-hover transition-all duration-200 shadow-elegant"
									disabled={isPending}
								>
									{isPending ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											Processando...
										</div>
									) : (
										<div className="flex items-center gap-2">
											Gerar Orçamento
											<ArrowRight className="w-4 h-4" />
										</div>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
