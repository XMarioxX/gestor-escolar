"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
    _id: string,
    name: string,
    numeroControl: string,
    age: string
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "numeroControl",
        header: "Número de Control",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        
        accessorKey: "age",
        header:  () => <div className="text-right">Edad</div>,
        cell: ({ row }) => {
          const age = parseFloat(row.getValue("age") )
          return <div className="text-right font-medium">{age}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const student = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(student._id)}
                >
                  Copiar Id del Alumno
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ver Alumno </DropdownMenuItem>
                <DropdownMenuItem>Otra opción</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },

]
