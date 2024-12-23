"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Alumnno = {
    id: string,
    nombre: string,
    numeroControl: string,
    edad: number
}

export const columns: ColumnDef<Alumnno>[] = [
    {
        accessorKey: "numeroControl",
        header: "Numero de Control",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "edad",
        header: "Edad",
    },

]
