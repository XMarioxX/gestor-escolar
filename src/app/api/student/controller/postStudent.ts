import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/student";

interface StudentData {
    name: string;
    numeroControl: string;
    age: number;
}

export async function postStudent(request: NextRequest) {
    try {
        await connectDB();
        
        // Validar que el body sea JSON válido
        const data = await request.json() as StudentData;
        
        // Validaciones básicas
        if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
            return NextResponse.json({
                success: false,
                error: 'El nombre es requerido y debe tener al menos 2 caracteres'
            }, { status: 400 });
        }

        if (!data.numeroControl || typeof data.numeroControl !== 'string' || !/^[A-Z0-9]+$/.test(data.numeroControl)) {
            return NextResponse.json({
                success: false,
                error: 'El número de control es requerido y debe contener solo letras mayúsculas y números'
            }, { status: 400 });
        }

        if (!data.age || typeof data.age !== 'number' || data.age < 15 || data.age > 100) {
            return NextResponse.json({
                success: false,
                error: 'La edad debe ser un número entre 15 y 100'
            }, { status: 400 });
        }

        // Verificar si ya existe un estudiante con el mismo número de control
        const existingStudent = await Student.findOne({ numeroControl: data.numeroControl });
        if (existingStudent) {
            return NextResponse.json({
                success: false,
                error: 'Ya existe un estudiante con este número de control'
            }, { status: 409 });
        }

        // Crear el estudiante
        const newStudent = await Student.create({
            name: data.name.trim(),
            numeroControl: data.numeroControl.toUpperCase(),
            age: data.age
        });

        // Retornar respuesta exitosa
        return NextResponse.json({
            success: true,
            message: 'Estudiante creado exitosamente',
            data: newStudent
        }, { status: 201 });

    } catch (error) {
        console.error('Error al crear estudiante:', error);

        // Manejar errores de validación de Mongoose
        if ((error as any).name === 'ValidationError') {
            return NextResponse.json({
                success: false,
                error: 'Error de validación',
                details: Object.values((error as any).errors).map((err: any) => err.message)
            }, { status: 400 });
        }

        // Manejar errores de duplicación de MongoDB
        if ((error as any).code === 11000) {
            return NextResponse.json({
                success: false,
                error: 'Ya existe un estudiante con este número de control'
            }, { status: 409 });
        }

        // Otros errores
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}