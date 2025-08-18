import { Home, FileText, History, Calculator, ReceiptText } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
	{
		title: "Novo Orçamento",
		url: "/",
		icon: Home,
	},
	{
		title: "Histórico",
		url: "/historico",
		icon: ReceiptText,
	},
];

export function AppSidebar() {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";

	return (
		<Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
			<SidebarHeader className="bg-gradient-card">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
						<Calculator className="w-4 h-4 text-white" />
					</div>
					{!collapsed && (
						<div>
							<h2 className="font-semibold text-foreground">Orça Aí</h2>
						</div>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent className="bg-gradient-card">
				<SidebarGroup>
					<SidebarGroupLabel className="text-muted-foreground font-medium">
						Navegação
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigation.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink
											to={item.url}
											end
											className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
										>
											<item.icon className="h-4 w-4" />
											{item.title}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
