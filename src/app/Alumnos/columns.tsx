"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
    id: string,
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

]
