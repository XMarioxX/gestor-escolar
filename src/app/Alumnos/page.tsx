import { Student, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from 'axios'

async function getData(page: number = 1): Promise<Student[]> {

    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    try {
        const response = await axios.get(`${endpoint}/student?page=${page}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function DemoPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = parseInt(searchParams.page ?? '1')
    const data = await getData(page)

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data } />
        </div>
    )
}
