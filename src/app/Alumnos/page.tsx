import { Student, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from 'axios'

async function getData(): Promise<Student[]> {

    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    try {
        const response = await axios.get(`${endpoint}/student`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
