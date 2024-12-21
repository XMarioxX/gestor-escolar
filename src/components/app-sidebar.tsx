import { Calendar, Home, Inbox, Search, Settings, LibraryBig, GalleryVerticalEnd } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
    {
        title: "Inicio",
        url: "/",
        icon: Home,
    },
    {
        title: "Materias",
        url: "/Materias",
        icon: LibraryBig,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />

            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex flex-col gap-0.5 leading-none border border-black bg-blue-200 mx-10 justify-center items-center p-2 rounded-lg">
                        <span className="font-semibold">Gestor Escolar</span>
                    </div>
                    {/*Aqui ira el toogle para los temas */}

                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarContent>

                <SidebarGroup>
                    {/* <SidebarGroupLabel>General</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}
