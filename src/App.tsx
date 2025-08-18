import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./shared/layouts/DashboardLayout";
import { OrcamentoProvider } from "./orcamentos/contexts/OrcamentoContext";

import Home from "./pages/Home";
import Orcamento from "./pages/Orcamento";
import Historico from "./pages/Historico";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<OrcamentoProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<DashboardLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/orcamento/:id" element={<Orcamento />} />
							<Route path="/historico" element={<Historico />} />
							{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</DashboardLayout>
				</BrowserRouter>
			</OrcamentoProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
