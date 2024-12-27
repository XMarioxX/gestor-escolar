import { Student, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "German",
      numeroControl: "1234",
      age: "21",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
