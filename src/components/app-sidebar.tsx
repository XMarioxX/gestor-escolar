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
import { ModeToggle } from "./mode-toggle"
import { NavUser } from "./nav-user"

const data = {
    items: [
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
    ],
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    }
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>

                <SidebarMenu>
                    <SidebarMenuItem className=" flex flex-row justify-around items-center gap-2">
                        <SidebarMenuButton asChild>
                            <div className="flex flex-col gap-0.5 leading-none border border-black bg-primary text-secondary justify-center items-center p-2 rounded-lg">
                                <Link href={"/"}>
                                    <span className="font-semibold">Gestor Escolar</span>
                                </Link>

                            </div>
                        </SidebarMenuButton>
                        <ModeToggle />
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    {/* <SidebarGroupLabel>General</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.items.map((item) => (
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

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
