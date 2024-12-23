import { connectDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";
import { getStudent } from "./controller/getStudent";
import { postStudent } from "./controller/postStudent";

export async function GET(request: NextRequest) {
    return getStudent(request);
}

export async function POST(request: NextRequest) {
    return postStudent(request);
}