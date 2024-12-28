"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,

} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ApiData<TData> {
  data: TData[]
  pagination?: {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: ApiData<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const tableData = data?.data ?? []

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: data.pagination?.totalPages,
    state: {
      pagination: {
          pageIndex: (data.pagination?.currentPage || 1) - 1,
          pageSize: 0
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay datos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    
    <div className="flex items-center justify-end space-x-2 py-4">
      <Link href={`/Alumnos?page=${(data.pagination?.currentPage || 1) - 1}`}>
        <Button
          variant="outline"
          size="sm"
          disabled={!data.pagination?.hasPrevPage}
        >
          Anterior
        </Button>
      </Link>
      <Link href={`/Alumnos?page=${(data.pagination?.currentPage || 1) + 1}`}>
        <Button
          variant="outline"
          size="sm"
          disabled={!data.pagination?.hasNextPage}
        >
          Siguiente
        </Button>
      </Link>
    </div>

    </div>

  )
}
